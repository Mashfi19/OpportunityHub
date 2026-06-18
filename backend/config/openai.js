const { OpenAI } = require("openai");

let openai = null;
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("WARNING: OPENAI_API_KEY is not defined in environment variables. AI features will run in mock demonstration mode.");
} else {
  try {
    openai = new OpenAI({ apiKey });
  } catch (err) {
    console.error("Failed to initialize OpenAI Client:", err.message);
  }
}

module.exports = openai;
