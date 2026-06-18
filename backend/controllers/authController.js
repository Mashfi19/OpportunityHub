const authService = require("../services/authService");
const { validateRegister, validateLogin } = require("../utils/validators");

class AuthController {
  async register(req, res, next) {
    try {
      const validation = validateRegister(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Validation failed.",
          details: validation.error.flatten().fieldErrors,
          status: 400
        });
      }

      const { user, token } = await authService.register(req.body);
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ error: err.message, status: 400 });
    }
  }

  async login(req, res, next) {
    try {
      const validation = validateLogin(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Validation failed.",
          details: validation.error.flatten().fieldErrors,
          status: 400
        });
      }

      const { user, token } = await authService.login(req.body);
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(400).json({ error: err.message, status: 400 });
    }
  }

  async getMe(req, res, next) {
    try {
      // req.user is populated by authMiddleware
      res.status(200).json({ user: req.user });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
