const express = require("express");
const profileController = require("../controllers/profileController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const validate = require("../middlewares/validationMiddleware");
const { validateProfile } = require("../utils/validators");

const router = express.Router();

router.use(authMiddleware); // Protect all profile routes

router.get("/", profileController.getProfile);
router.put("/", validate(validateProfile), profileController.updateProfile);

module.exports = router;
