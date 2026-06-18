const express = require("express");
const adminController = require("../controllers/adminController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Enforce both middlewares to lock down admin API routes
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/stats", adminController.getStats);
router.get("/users", adminController.getUsers);
router.put("/users/:id/role", adminController.updateUserRole);
router.get("/logs", adminController.getLogs);

// Moderation desk
router.put("/opportunities/:id/approve", adminController.approveOpportunity);
router.put("/opportunities/:id/reject", adminController.rejectOpportunity);

module.exports = router;
