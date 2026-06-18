const openai = require("../../config/openai");

class AiEligibilityService {
  async checkEligibility(profile, opportunity) {
    if (!profile || !opportunity) {
      return { score: 0, isEligible: false, reasons: [], gaps: [] };
    }

    console.log(`[AI Eligibility] Evaluating profile suitability for: "${opportunity.title}"`);

    const contextPrompt = `
      Student Profile:
      - Citizenship: ${profile.citizenship}
      - Degree Level: ${profile.degree}
      - Cumulative GPA: ${profile.cgpa} / 4.0
      - Major: ${profile.major}
      - IELTS: ${profile.ielts || "None"}
      - TOEFL: ${profile.toefl || "None"}

      Opportunity Details:
      - Title: ${opportunity.title}
      - Category: ${opportunity.category}
      - GPA Minimum Required: ${opportunity.gpa_min || "None"}
      - IELTS Minimum: ${opportunity.ielts_min || "None"}
      - TOEFL Minimum: ${opportunity.toefl_min || "None"}
      - Eligible Citizenships: ${opportunity.eligible_citizenships || "GLOBAL"}
      - Academic Levels: ${opportunity.levels || "All"}
      - Study Fields: ${opportunity.disciplines || "All"}
    `;

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an academic advisor evaluating student eligibility for scholarships.
              Return a JSON object containing:
              - score (integer 0-100)
              - isEligible (boolean)
              - reasons (array of matching fields)
              - gaps (array of missing requirements or points of improvement)
              - roadmap (array of actionable steps to qualify)`
            },
            {
              role: "user",
              content: contextPrompt
            }
          ],
          response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content);
      } catch (err) {
        console.error("[AI Eligibility] OpenAI API Error, falling back to deterministic checker:", err.message);
      }
    }

    // Fallback: Deterministic mockup checker (Graceful degradation)
    const reasons = [];
    const gaps = [];
    let score = 75;

    // Check GPA
    if (opportunity.gpa_min && profile.cgpa < opportunity.gpa_min) {
      gaps.push(`GPA of ${profile.cgpa} is below the required ${opportunity.gpa_min}.`);
      score -= 20;
    } else {
      reasons.push("GPA meets program requirements.");
    }

    // Check language
    if (opportunity.ielts_min && (!profile.ielts || profile.ielts < opportunity.ielts_min)) {
      gaps.push(`IELTS score is below the required ${opportunity.ielts_min}.`);
      score -= 15;
    } else if (opportunity.ielts_min) {
      reasons.push("English proficiency meets standards.");
    }

    return {
      score: Math.max(0, score),
      isEligible: gaps.length === 0,
      reasons,
      gaps,
      roadmap: gaps.map(g => `Address: ${g}`)
    };
  }
}

module.exports = new AiEligibilityService();
