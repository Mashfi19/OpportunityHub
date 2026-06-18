const jwt = require("jsonwebtoken");
const config = require("../config/db");

// Protects routes from unauthorized sessions
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided.", status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // { id, name, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session token.", status: 401 });
  }
}

// Optional auth - doesn't block guests, but populates req.user if a session exists
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded;
    } catch (err) {
      // Ignore invalid tokens for optional auth
    }
  }
  next();
}

module.exports = {
  authMiddleware,
  optionalAuth
};
