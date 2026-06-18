const openai = require("../../config/openai");

class AiRecommendationService {
  // Compute match score locally (deterministic rule-based algorithm) to rank opportunities
  calculateScore(profile, opportunity) {
    if (!profile || !opportunity) return 0;

    let score = 0;
    let isEligible = true;

    // 1. Citizenship check (hard blocker)
    const eligibleCitizens = opportunity.eligible_citizenships || [];
    const isGlobal = eligibleCitizens.length === 0 || eligibleCitizens.includes("GLOBAL");
    
    // If not global and student's citizenship is not matched
    if (!isGlobal && profile.citizenship && !eligibleCitizens.includes(profile.citizenship)) {
      isEligible = false;
    }

    // 2. Academic Level check (weight: 35 points)
    const levels = opportunity.academic_levels || opportunity.levels || [];
    if (profile.degree) {
      if (levels.length === 0 || levels.includes(profile.degree)) {
        score += 35;
      } else {
        isEligible = false;
      }
    }

    // 3. Study Field / Major check (weight: 30 points)
    const disciplines = opportunity.disciplines || [];
    if (profile.major) {
      if (disciplines.length === 0 || disciplines.includes(profile.major) || disciplines.includes("All")) {
        score += 30;
      } else {
        score += 5; // small consolation
      }
    }

    // 4. CGPA merit alignment (weight: 20 points)
    const minGpa = parseFloat(opportunity.gpa_min);
    if (isNaN(minGpa)) {
      score += 20; // no GPA blocker
    } else if (profile.cgpa >= minGpa) {
      score += 20;
    } else {
      isEligible = false;
    }

    // 5. English proficiency alignment (weight: 15 points)
    const minIelts = parseFloat(opportunity.ielts_min);
    const minToefl = parseInt(opportunity.toefl_min);
    const hasIeltsReq = !isNaN(minIelts) && minIelts > 0;
    const hasToeflReq = !isNaN(minToefl) && minToefl > 0;

    if (!hasIeltsReq && !hasToeflReq) {
      score += 15;
    } else {
      let met = false;
      if (hasIeltsReq && profile.ielts >= minIelts) met = true;
      if (hasToeflReq && profile.toefl >= minToefl) met = true;

      if (met) {
        score += 15;
      } else {
        isEligible = false;
      }
    }

    // Cap score for ineligible candidates to keep them low on the list
    return isEligible ? Math.round(score) : Math.min(Math.round(score), 15);
  }

  async getRecommendations(profile, opportunities) {
    if (!profile || !opportunities || opportunities.length === 0) {
      return [];
    }

    // 1. Score and filter opportunities
    const scoredList = opportunities.map(opp => {
      const score = this.calculateScore(profile, opp);
      return { opportunity: opp, score };
    });

    // 2. Sort by match score descending and select top 4 items
    const topScored = scoredList
      .filter(item => item.score >= 50)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    // 3. Generate explanations for top recommended opportunities
    const results = [];
    for (const item of topScored) {
      const explanation = await this.explainRecommendation(profile, item.opportunity);
      results.push({
        ...item.opportunity,
        matchScore: item.score,
        aiExplanation: explanation
      });
    }

    return results;
  }

  async explainRecommendation(profile, opportunity) {
    if (!profile || !opportunity) return "";

    console.log(`[AI Recs] Generating fit explanation for: "${opportunity.title}"`);

    const contextInstruction = `
      Write a concise 2-sentence explanation indicating why this opportunity is recommended for the student:
      Student Profile:
      - Major: ${profile.major}
      - Citizenship: ${profile.citizenship}
      - GPA: ${profile.cgpa}
      
      Opportunity Details:
      - Title: ${opportunity.title}
      - Category: ${opportunity.category}
      - Funding: ${opportunity.funding_type}
    `;

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an academic advisor writing highly positive, personalized matching tips for a student dashboard. Keep it to max 2 sentences."
            },
            {
              role: "user",
              content: contextInstruction
            }
          ]
        });

        return response.choices[0].message.content.trim();
      } catch (err) {
        console.error("[AI Recs] OpenAI API Error, falling back to deterministic explanation:", err.message);
      }
    }

    // Fallback: Default explanation
    return `Matches your study focus in ${profile.major} and provides prestigious ${opportunity.funding_type} backing for global mobility.`;
  }
}

module.exports = new AiRecommendationService();
