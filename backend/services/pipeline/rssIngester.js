const { query } = require("../../database/connection");

class RssIngester {
  async fetchOpportunities() {
    try {
      // 1. Fetch active RSS feeds from Database
      const activeFeedsResult = await query("SELECT feed_url, category_id FROM rss_sources WHERE is_active = TRUE");
      
      console.log(`Aggregating records across ${activeFeedsResult.rows.length} registered RSS feeds...`);

      // In production: Use Parser from 'rss-parser' to parse XML elements:
      // const Parser = require('rss-parser');
      // const parser = new Parser();
      // for(const feed of activeFeeds.rows) { const feedData = await parser.parseURL(feed.feed_url); ... }

      const simulatedRssItems = [
        {
          title: "CERN Summer Student Fellowship Programme 2027",
          description: "Paid internships in particle physics, computer science, and engineering at CERN in Geneva, Switzerland.",
          categoryName: "Internship",
          fundingTypeName: "Paid",
          officialSourceUrl: "https://careers.cern/summer",
          applicationUrl: "https://careers.cern/apply",
          host: "CERN",
          location: "Switzerland",
          amount: "90 CHF / Day + flight travel",
          deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
          gpaMin: 3.2,
          ieltsMin: 6.0,
          toeflMin: 75,
          disciplines: ["STEM"],
          levels: ["Undergraduate", "Graduate"],
          eligibleCitizenships: ["GLOBAL"]
        }
      ];

      return simulatedRssItems;
    } catch (err) {
      console.error("RSS Ingest Failure:", err.message);
      return [];
    }
  }
}

module.exports = new RssIngester();
