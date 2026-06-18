const { Pool } = require("pg");
const config = require("../config/db");

const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 20, // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: config.nodeEnv === "production" ? { rejectUnauthorized: false } : false
});

// Log pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
