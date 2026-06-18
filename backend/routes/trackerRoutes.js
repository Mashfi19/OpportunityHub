const express = require("express");
const trackerController = require("../controllers/trackerController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const validate = require("../middlewares/validationMiddleware");
const { validateBookmark } = require("../utils/validators");

const router = express.Router();

router.use(authMiddleware); // Protect all tracker routes

router.get("/", trackerController.getTrackedItems);
router.post("/", validate(validateBookmark), trackerController.addOrUpdateTrackedItem);
router.delete("/:id", trackerController.removeTrackedItem);

module.exports = router;
