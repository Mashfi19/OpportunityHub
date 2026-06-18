const config = require("../config/db");

// Centralized error middleware
function errorMiddleware(err, req, res, next) {
  console.error("Express Error Intercepted:", err.stack || err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: message,
    status,
    ...(config.nodeEnv === "development" && { stack: err.stack })
  });
}

module.exports = errorMiddleware;
