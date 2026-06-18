const { query } = require("../../database/connection");

class DeduplicationService {
  async filterDuplicates(items) {
    if (items.length === 0) return [];

    const uniqueItems = [];

    for (const item of items) {
      // Direct lookups on official source URLs
      const existing = await query(
        "SELECT id FROM opportunities WHERE official_source_url = $1",
        [item.officialSourceUrl]
      );

      if (existing.rows.length === 0) {
        uniqueItems.push(item);
      }
    }

    return uniqueItems;
  }
}

module.exports = new DeduplicationService();
