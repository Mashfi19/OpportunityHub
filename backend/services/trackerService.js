const { query } = require("../database/connection");

class TrackerService {
  async getTrackedItems(userId) {
    const result = await query(
      `SELECT b.status, b.notes, b.created_at, b.opportunity_id,
              o.title, o.host, o.location, o.type, o.funding_type_id, o.official_source_url, f.name as funding_type
       FROM bookmarks b
       JOIN opportunities o ON b.opportunity_id = o.id
       JOIN funding_types f ON o.funding_type_id = f.id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  async addOrUpdateTrackedItem(userId, { opportunity_id, status, notes }) {
    // Check if opportunity exists
    const oppCheck = await query("SELECT id FROM opportunities WHERE id = $1", [opportunity_id]);
    if (oppCheck.rows.length === 0) {
      throw new Error("Opportunity not found.");
    }

    const check = await query("SELECT status FROM bookmarks WHERE user_id = $1 AND opportunity_id = $2", [userId, opportunity_id]);

    if (check.rows.length > 0) {
      const updateResult = await query(
        `UPDATE bookmarks
         SET status = $3, notes = $4, created_at = CURRENT_TIMESTAMP
         WHERE user_id = $1 AND opportunity_id = $2
         RETURNING opportunity_id, status, notes`,
        [userId, opportunity_id, status, notes || null]
      );
      return updateResult.rows[0];
    } else {
      const insertResult = await query(
        `INSERT INTO bookmarks (user_id, opportunity_id, status, notes)
         VALUES ($1, $2, $3, $4)
         RETURNING opportunity_id, status, notes`,
        [userId, opportunity_id, status, notes || null]
      );
      return insertResult.rows[0];
    }
  }

  async removeTrackedItem(userId, opportunityId) {
    const result = await query(
      "DELETE FROM bookmarks WHERE user_id = $1 AND opportunity_id = $2 RETURNING opportunity_id",
      [userId, opportunityId]
    );
    if (result.rows.length === 0) {
      throw new Error("Tracked item not found.");
    }
    return { success: true, removedId: opportunityId };
  }
}

module.exports = new TrackerService();
