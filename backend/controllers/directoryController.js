const { query } = require("../database/connection");

class DirectoryController {
  // Get all countries with active opportunities count
  async getCountries(req, res, next) {
    try {
      const sql = `
        SELECT c.*, COUNT(o.id) as active_opportunities_count
        FROM countries c
        LEFT JOIN opportunities o ON o.country_id = c.id AND o.status = 'active'
        GROUP BY c.id
        ORDER BY active_opportunities_count DESC, c.name ASC
      `;
      const result = await query(sql);
      res.status(200).json(result.rows);
    } catch (err) {
      next(err);
    }
  }

  // Get all universities with stats and opportunity count
  async getUniversities(req, res, next) {
    try {
      const sql = `
        SELECT u.*, c.name as country_name, c.code as country_code, COUNT(o.id) as active_opportunities_count
        FROM universities u
        JOIN countries c ON u.country_id = c.id
        LEFT JOIN opportunities o ON o.university_id = u.id AND o.status = 'active'
        GROUP BY u.id, c.name, c.code
        ORDER BY u.ranking_global ASC NULLS LAST, u.name ASC
      `;
      const result = await query(sql);
      res.status(200).json(result.rows);
    } catch (err) {
      next(err);
    }
  }

  // Get all organizations with stats and opportunity count
  async getOrganizations(req, res, next) {
    try {
      const sql = `
        SELECT org.*, COUNT(o.id) as active_opportunities_count
        FROM organizations org
        LEFT JOIN opportunities o ON o.organization_id = org.id AND o.status = 'active'
        GROUP BY org.id
        ORDER BY active_opportunities_count DESC, org.name ASC
      `;
      const result = await query(sql);
      res.status(200).json(result.rows);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DirectoryController();
