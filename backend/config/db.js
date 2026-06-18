require("dotenv").config();

const config = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  jwtSecret: process.env.JWT_SECRET || "default_jwt_secret_key_123!",
  databaseUrl: process.env.DATABASE_URL,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
  nextjsRevalidateToken: process.env.NEXTJS_REVALIDATE_TOKEN || "revalidate_token_secret_123!",
  nextjsAppUrl: process.env.NEXTJS_APP_URL || "http://localhost:3000"
};

// Verify critical variables
if (!config.databaseUrl) {
  console.warn("WARNING: DATABASE_URL is not set in environment variables.");
}

module.exports = config;
