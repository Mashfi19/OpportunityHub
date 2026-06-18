const { query } = require("../database/connection");
const logService = require("../services/logService");

class AdminController {
  async getStats(req, res, next) {
    try {
      const opps = await query("SELECT status, count(*) as count FROM opportunities GROUP BY status");
      const users = await query("SELECT count(*) as count FROM users");
      const bookmarks = await query("SELECT status, count(*) as count FROM bookmarks GROUP BY status");

      const stats = {
        opportunities: { draft: 0, active: 0, closed: 0, archived: 0, total: 0 },
        users: parseInt(users.rows[0]?.count || 0),
        bookmarks: { wishlist: 0, applied: 0, interviewing: 0, offer: 0, total: 0 }
      };

      opps.rows.forEach(r => {
        stats.opportunities[r.status] = parseInt(r.count);
        stats.opportunities.total += parseInt(r.count);
      });

      bookmarks.rows.forEach(r => {
        stats.bookmarks[r.status] = parseInt(r.count);
        stats.bookmarks.total += parseInt(r.count);
      });

      res.status(200).json(stats);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const result = await query("SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC");
      res.status(200).json(result.rows);
    } catch (err) {
      next(err);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!["user", "admin"].includes(role)) {
        return res.status(400).json({ error: "Invalid role assignment.", status: 400 });
      }

      const result = await query(
        "UPDATE users SET role = $2 WHERE id = $1 RETURNING id, name, email, role",
        [id, role]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found.", status: 404 });
      }

      const targetUser = result.rows[0];
      await logService.log("admin_action", `User role updated for ${targetUser.email} to ${role}`, { adminId: req.user.id });

      res.status(200).json({ success: true, user: targetUser });
    } catch (err) {
      next(err);
    }
  }

  async approveOpportunity(req, res, next) {
    try {
      const { id } = req.params;
      const result = await query(
        "UPDATE opportunities SET status = 'active', updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id, title",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Opportunity not found.", status: 404 });
      }

      const opp = result.rows[0];
      await logService.log("admin_action", `Approved opportunity: "${opp.title}"`, { adminId: req.user.id, opportunityId: id });

      res.status(200).json({ success: true, message: "Opportunity approved and published.", opportunity: opp });
    } catch (err) {
      next(err);
    }
  }

  async rejectOpportunity(req, res, next) {
    try {
      const { id } = req.params;
      const result = await query(
        "UPDATE opportunities SET status = 'archived', updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id, title",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Opportunity not found.", status: 404 });
      }

      const opp = result.rows[0];
      await logService.log("admin_action", `Rejected/Archived opportunity: "${opp.title}"`, { adminId: req.user.id, opportunityId: id });

      res.status(200).json({ success: true, message: "Opportunity rejected and archived.", opportunity: opp });
    } catch (err) {
      next(err);
    }
  }

  async getLogs(req, res, next) {
    try {
      const logs = await logService.getLogs(100);
      res.status(200).json(logs);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
