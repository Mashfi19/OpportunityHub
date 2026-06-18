const express = require("express");
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { authLimiter } = require("../middlewares/rateLimitMiddleware");

const validate = require("../middlewares/validationMiddleware");
const { validateRegister, validateLogin } = require("../utils/validators");

const router = express.Router();

router.post("/register", authLimiter, validate(validateRegister), authController.register);
router.post("/login", authLimiter, validate(validateLogin), authController.login);
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
