const { query } = require("../database/connection");

class LogService {
  async log(logType, message, metadata = null) {
    try {
      await query(
        "INSERT INTO activity_logs (log_type, message, metadata) VALUES ($1, $2, $3)",
        [logType, message, metadata ? JSON.stringify(metadata) : null]
      );
    } catch (err) {
      console.error("Failed to write to activity_logs:", err.message);
    }
  }

  async getLogs(limit = 100) {
    const result = await query(
      "SELECT id, log_type, message, metadata, created_at FROM activity_logs ORDER BY created_at DESC LIMIT $1",
      [limit]
    );
    return result.rows;
  }
}

module.exports = new LogService();
