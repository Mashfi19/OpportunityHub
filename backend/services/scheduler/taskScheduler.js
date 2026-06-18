const cron = require("node-cron");
const apiIngester = require("../pipeline/apiIngester");
const rssIngester = require("../pipeline/rssIngester");
const webScraper = require("../pipeline/webScraper");
const validationService = require("../pipeline/validationService");
const deduplicationService = require("../pipeline/deduplicationService");
const storageService = require("../pipeline/storageService");
const { query } = require("../../database/connection");
const axios = require("axios");
const config = require("../../config/db");

// The unified hourly task execution
async function runHourlyPipeline() {
  console.log(`[Scheduler] Starting Ingestion Sequence: ${new Date().toISOString()}`);

  try {
    // 1. Fetch from Ingestion Sources
    const apiPromise = apiIngester.fetchOpportunities();
    const rssPromise = rssIngester.fetchOpportunities();
    const scrapePromise = webScraper.fetchOpportunities();

    const [apiItems, rssItems, scrapedItems] = await Promise.all([
      apiPromise,
      rssPromise,
      scrapePromise
    ]);

    const rawBatch = [...apiItems, ...rssItems, ...scrapedItems];
    console.log(`[Scheduler] Collected ${rawBatch.length} raw records. Validating structures...`);

    // 2. Validate structures via Zod
    const { valid, invalid } = validationService.validateBatch(rawBatch);
    console.log(`[Scheduler] Validation results: ${valid.length} valid, ${invalid.length} invalid.`);

    // Log validation failures
    if (invalid.length > 0) {
      console.warn(`[Scheduler] Skipped ${invalid.length} malformed records.`);
    }

    // 3. Deduplicate against active Database records
    const uniqueItems = await deduplicationService.filterDuplicates(valid);
    console.log(`[Scheduler] Deduplication: ${uniqueItems.length} unique opportunities to insert (skipped ${valid.length - uniqueItems.length} duplicates).`);

    // 4. Bulk-Write to Supabase
    const { insertedCount } = await storageService.saveBatch(uniqueItems);
    console.log(`[Scheduler] Successfully inserted ${insertedCount} new listings into Supabase database.`);

    // 5. Clean/Close Expired Listings
    console.log("[Scheduler] Scanning database for expired opportunities...");
    
    // Updates status to 'closed' for any opportunity whose active deadline is in the past
    const closeResult = await query(
      `UPDATE opportunities 
       SET status = 'closed', updated_at = CURRENT_TIMESTAMP
       WHERE id IN (
         SELECT opportunity_id FROM deadlines 
         WHERE deadline_date < CURRENT_TIMESTAMP AND is_active = TRUE
       ) AND status = 'active'
       RETURNING id`
    );
    console.log(`[Scheduler] Checked deadlines: closed ${closeResult.rows.length} expired opportunities.`);

    // 6. Trigger Frontend Cache Revalidation
    if (insertedCount > 0 || closeResult.rows.length > 0) {
      await triggerRevalidation();
    }

    // Log success run
    await query(
      "INSERT INTO activity_logs (log_type, message, metadata) VALUES ($1, $2, $3)",
      [
        "crawler_run",
        "Hourly ingestion pipeline executed successfully.",
        JSON.stringify({
          rawCollected: rawBatch.length,
          validInserted: insertedCount,
          closedExpired: closeResult.rows.length
        })
      ]
    );

    console.log("[Scheduler] Hourly Ingestion Sequence finished successfully.");
  } catch (err) {
    console.error("[Scheduler] Critical Pipeline Failure:", err);
    try {
      await query(
        "INSERT INTO activity_logs (log_type, message, metadata) VALUES ($1, $2, $3)",
        ["system_error", "Hourly pipeline failed.", JSON.stringify({ error: err.message, stack: err.stack })]
      );
    } catch (dbErr) {
      console.error("[Scheduler] Failed to write error log to Database:", dbErr.message);
    }
  }
}

// Revalidation client webhook sender
async function triggerRevalidation() {
  const url = `${config.nextjsAppUrl}/api/revalidate?token=${config.nextjsRevalidateToken}&path=/opportunities`;
  console.log(`[Scheduler] Dispatching revalidation ping to Next.js: ${config.nextjsAppUrl}/api/revalidate`);

  try {
    const response = await axios.post(url);
    console.log("[Scheduler] Frontend revalidation successful:", response.data);
  } catch (err) {
    console.error("[Scheduler] Cache revalidation failed:", err.message);
  }
}

// Start Scheduled Job - Runs at minute 0 of every hour
cron.schedule("0 * * * *", () => {
  runHourlyPipeline();
});

module.exports = {
  runHourlyPipeline
};
