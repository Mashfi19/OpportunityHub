const profileService = require("../services/profileService");
const { validateProfile } = require("../utils/validators");

class ProfileController {
  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfile(req.user.id);
      if (!profile) {
        return res.status(404).json({ error: "Academic profile not configured yet.", status: 404 });
      }
      res.status(200).json(profile);
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const validation = validateProfile(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Validation failed.",
          details: validation.error.flatten().fieldErrors,
          status: 400
        });
      }

      const updated = await profileService.updateProfile(req.user.id, req.body);
      res.status(200).json({ success: true, profile: updated });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProfileController();
