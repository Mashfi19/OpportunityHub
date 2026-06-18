const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { apiLimiter } = require("./middlewares/rateLimitMiddleware");
const csrfMiddleware = require("./middlewares/csrfMiddleware");
const sanitizeMiddleware = require("./middlewares/sanitizeMiddleware");

// Import Route files
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const trackerRoutes = require("./routes/trackerRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const adminRoutes = require("./routes/adminRoutes");
const aiRoutes = require("./routes/aiRoutes");
const directoryRoutes = require("./routes/directoryRoutes");

const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || config.corsOrigin === "*") {
      return callback(null, true);
    }
    const allowed = [config.corsOrigin, "http://localhost:3000"].map(o => o.toLowerCase().trim());
    if (allowed.includes(origin.toLowerCase().trim())) {
      callback(null, true);
    } else {
      callback(null, false); // Block origin without throwing a backend runtime error
    }
  },
  credentials: true
}));
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));
app.use(express.json());

// Global security enforcements
app.use(apiLimiter);
app.use(csrfMiddleware);
app.use(sanitizeMiddleware);

// Bind REST routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/directories", directoryRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Centralized error interceptor middleware
app.use(errorMiddleware);

// Start automatic hourly data collection pipeline scheduler
require("./services/scheduler/taskScheduler");

// Listen on configured port
app.listen(config.port, () => {
  console.log(`OpportunityHub Server listening in ${config.nodeEnv} mode on port ${config.port}`);
});

module.exports = app;
