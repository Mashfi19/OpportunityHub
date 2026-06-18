const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../database/connection");
const config = require("../config/db");

class AuthService {
  async register({ name, email, phone, password }) {
    // Check if email already registered
    const existing = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      throw new Error("Email address already registered.");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    // Auto assign first user as admin, others as user
    const userCount = await query("SELECT count(*) as count FROM users");
    const role = parseInt(userCount.rows[0].count) === 0 ? "admin" : "user";

    const insertResult = await query(
      "INSERT INTO users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role",
      [name, email, phone, passwordHash, role]
    );

    const user = insertResult.rows[0];
    const token = this.generateToken(user);
    
    return { user, token };
  }

  async login({ email, password }) {
    const result = await query("SELECT id, name, email, phone, password_hash, role FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      throw new Error("Invalid email or password.");
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    };

    const token = this.generateToken(payload);
    
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token
    };
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: "7d" }
    );
  }
}

module.exports = new AuthService();
