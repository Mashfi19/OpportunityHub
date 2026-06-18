const config = require("../config/db");

// CSRF prevention using custom header verification
function csrfMiddleware(req, res, next) {
  // Safe HTTP methods do not require CSRF verification
  const safeMethods = ["GET", "HEAD", "OPTIONS"];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  const origin = req.headers.origin;
  const referer = req.headers.referer;

  // Verify Origin matches configured CORS origin in production
  if (config.nodeEnv === "production" && origin && origin !== config.corsOrigin) {
    return res.status(403).json({
      error: "CSRF Alert: Request origin mismatch.",
      status: 403
    });
  }

  // Enforce custom headers presence which cannot be set cross-origin by normal forms
  const csrfToken = req.headers["x-csrf-token"] || req.headers["x-requested-with"];
  
  if (!csrfToken) {
    return res.status(403).json({
      error: "CSRF Alert: Missing custom verification headers.",
      status: 403
    });
  }

  next();
}

module.exports = csrfMiddleware;
