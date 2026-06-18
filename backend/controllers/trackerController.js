const trackerService = require("../services/trackerService");
const { validateBookmark } = require("../utils/validators");

class TrackerController {
  async getTrackedItems(req, res, next) {
    try {
      const items = await trackerService.getTrackedItems(req.user.id);
      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  }

  async addOrUpdateTrackedItem(req, res, next) {
    try {
      const validation = validateBookmark(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Validation failed.",
          details: validation.error.flatten().fieldErrors,
          status: 400
        });
      }

      const bookmark = await trackerService.addOrUpdateTrackedItem(req.user.id, req.body);
      res.status(200).json({ success: true, bookmark });
    } catch (err) {
      res.status(400).json({ error: err.message, status: 400 });
    }
  }

  async removeTrackedItem(req, res, next) {
    try {
      const opportunityId = req.params.id;
      const result = await trackerService.removeTrackedItem(req.user.id, opportunityId);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message, status: 400 });
    }
  }
}

module.exports = new TrackerController();
