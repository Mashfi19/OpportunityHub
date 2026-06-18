// Restricts route handlers to admins only
function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Access denied. Session inactive.", status: 401 });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Administrator privileges required.", status: 403 });
  }

  next();
}

module.exports = adminMiddleware;
