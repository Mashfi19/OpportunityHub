const express = require("express");
const aiController = require("../controllers/aiController");
const { authMiddleware, optionalAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/search", aiController.parseSearch);
router.post("/summary", aiController.getSummary);
router.post("/chat", aiController.askChatbot);

// Protected routes (require user session)
router.post("/eligibility", authMiddleware, aiController.checkEligibility);
router.get("/recommendations", authMiddleware, aiController.getRecommendations);
router.post("/checklist", optionalAuth, aiController.getChecklist);

module.exports = router;
