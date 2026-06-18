const { query } = require("../database/connection");

class ProfileService {
  async getProfile(userId) {
    const result = await query("SELECT citizenship, degree, cgpa, major, ielts, toefl, preferred_countries FROM academic_profiles WHERE user_id = $1", [userId]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async updateProfile(userId, { citizenship, degree, cgpa, major, ielts, toefl, preferred_countries }) {
    // Upsert academic profile using PostgreSQL syntax
    const check = await query("SELECT user_id FROM academic_profiles WHERE user_id = $1", [userId]);
    
    if (check.rows.length > 0) {
      const updateResult = await query(
        `UPDATE academic_profiles 
         SET citizenship = $2, degree = $3, cgpa = $4, major = $5, ielts = $6, toefl = $7, preferred_countries = $8, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $1
         RETURNING citizenship, degree, cgpa, major, ielts, toefl, preferred_countries`,
        [userId, citizenship, degree, cgpa, major, ielts, toefl, preferred_countries]
      );
      return updateResult.rows[0];
    } else {
      const insertResult = await query(
        `INSERT INTO academic_profiles (user_id, citizenship, degree, cgpa, major, ielts, toefl, preferred_countries)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING citizenship, degree, cgpa, major, ielts, toefl, preferred_countries`,
        [userId, citizenship, degree, cgpa, major, ielts, toefl, preferred_countries]
      );
      return insertResult.rows[0];
    }
  }
}

module.exports = new ProfileService();
