const { pool, query } = require("../../database/connection");

class StorageService {
  async saveBatch(items) {
    if (items.length === 0) return { insertedCount: 0 };

    let insertedCount = 0;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Load reference category & funding maps
      const categoriesResult = await client.query("SELECT id, name FROM categories");
      const categoryMap = {};
      categoriesResult.rows.forEach(r => { categoryMap[r.name] = r.id; });

      const fundingResult = await client.query("SELECT id, name FROM funding_types");
      const fundingMap = {};
      fundingResult.rows.forEach(r => { fundingMap[r.name] = r.id; });

      for (const item of items) {
        const categoryId = categoryMap[item.categoryName];
        const fundingTypeId = fundingMap[item.fundingTypeName];

        if (!categoryId || !fundingTypeId) {
          console.warn(`Skipping insertion: Category '${item.categoryName}' or FundingType '${item.fundingTypeName}' not seeded.`);
          continue;
        }

        // 1. Insert parent Opportunity
        const oppResult = await client.query(
          `INSERT INTO opportunities (
            title, description, category_id, funding_type_id, official_source_url, application_url, status, published_at
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
           RETURNING id`,
          [
            item.title,
            item.description,
            categoryId,
            fundingTypeId,
            item.officialSourceUrl,
            item.applicationUrl || null,
            "draft" // Newly ingested items go to moderation approval queue
          ]
        );

        const opportunityId = oppResult.rows[0].id;

        // 2. Insert Category-Specific Specifications
        if (item.categoryName === "Scholarship") {
          await client.query(
            `INSERT INTO scholarships (opportunity_id, amount_value, covers_tuition, covers_stipend)
             VALUES ($1, $2, $3, $4)`,
            [opportunityId, item.amount, true, true]
          );
        } else if (item.categoryName === "Internship") {
          await client.query(
            `INSERT INTO internships (opportunity_id, stipend_amount, is_paid, is_remote)
             VALUES ($1, $2, $3, $4)`,
            [opportunityId, item.amount, true, false]
          );
        }

        // 3. Insert Deadline
        if (item.deadline) {
          await client.query(
            `INSERT INTO deadlines (opportunity_id, deadline_date, description)
             VALUES ($1, $2, $3)`,
            [opportunityId, new Date(item.deadline), "Application Deadline"]
          );
        }

        insertedCount++;
      }

      await client.query("COMMIT");
      return { insertedCount };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = new StorageService();
