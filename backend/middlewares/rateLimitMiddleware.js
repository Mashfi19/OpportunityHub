const ipRequestMap = new Map();

// Helper to clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestMap.entries()) {
    if (now > data.resetTime) {
      ipRequestMap.delete(ip);
    }
  }
}, 5 * 60 * 1000); // every 5 minutes

function createRateLimiter({ windowMs, max, message }) {
  return (req, res, next) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const now = Date.now();

    let clientData = ipRequestMap.get(ip);

    if (!clientData || now > clientData.resetTime) {
      clientData = {
        count: 0,
        resetTime: now + windowMs
      };
    }

    clientData.count++;
    ipRequestMap.set(ip, clientData);

    // Set standard rate limiting headers
    res.setHeader("X-RateLimit-Limit", max);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, max - clientData.count));
    res.setHeader("X-RateLimit-Reset", Math.ceil(clientData.resetTime / 1000));

    if (clientData.count > max) {
      return res.status(429).json({
        error: message || "Too many requests. Please try again later.",
        status: 429
      });
    }

    next();
  };
}

const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many catalog requests. Please wait 15 minutes."
});

const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many authentication attempts. Please try again after 15 minutes."
});

module.exports = {
  apiLimiter,
  authLimiter
};
