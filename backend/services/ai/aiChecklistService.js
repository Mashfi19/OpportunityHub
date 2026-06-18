const openai = require("../../config/openai");

class AiChecklistService {
  async generateChecklist(profile, opportunity) {
    if (!opportunity) {
      return { documents: [], tips: [] };
    }

    console.log(`[AI Checklist] Generating customized document checklist for opportunity: "${opportunity.title}"`);

    const contextInstruction = `
      Student Profile:
      - Major: ${profile?.major || "All fields"}
      - Current Degree: ${profile?.degree || "Undergraduate"}
      - Language Test Scores: IELTS ${profile?.ielts || "None"}, TOEFL ${profile?.toefl || "None"}

      Opportunity Details:
      - Title: ${opportunity.title}
      - Type: ${opportunity.category}
      - Funding: ${opportunity.funding_type}
      - Stated Required Documents: ${(opportunity.required_documents || []).join(", ") || "CV, transcripts, motivation letter"}
    `;

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an academic advisor creating a personalized, customized application checklist for a student.
              Analyze the opportunity type and the student's profile to output a JSON object containing:
              - documents: array of objects, each containing:
                - name: string (e.g., "Official Transcripts", "Motivation Letter")
                - status: boolean (always false by default)
                - description: string (why it's needed and what details the student should focus on based on their major/credentials)
              - tips: array of 3 actionable preparation tips (e.g., "Request recommendation letters at least 4 weeks in advance").`
            },
            {
              role: "user",
              content: contextInstruction
            }
          ],
          response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content);
      } catch (err) {
        console.error("[AI Checklist] OpenAI API Error, falling back to deterministic list generator:", err.message);
      }
    }

    // Fallback: Smart local generator (Graceful degradation)
    const baseDocs = opportunity.required_documents || [
      "Official Transcripts",
      "Curriculum Vitae (CV)",
      "Statement of Purpose (SOP)",
      "Letters of Recommendation",
      "English Proficiency Test Report"
    ];

    const documents = baseDocs.map(docName => {
      let desc = `Required for official review of your candidacy for the ${opportunity.category} program.`;
      if (docName.toLowerCase().includes("transcripts")) {
        desc = `Provide translated, certified transcripts. Keep in mind your CGPA is ${profile?.cgpa || "3.60"}.`;
      } else if (docName.toLowerCase().includes("recommendation")) {
        desc = `Secure academic letters from professors. Emphasize research in ${profile?.major || "STEM"} fields.`;
      } else if (docName.toLowerCase().includes("sop") || docName.toLowerCase().includes("statement of purpose")) {
        desc = `Tailor your statement to highlight your fit for ${opportunity.host || "host university"}'s research track.`;
      }
      return {
        name: docName,
        status: false,
        description: desc
      };
    });

    return {
      documents,
      tips: [
        "Request recommendation letters at least 3-4 weeks in advance.",
        "Ensure all transcript translations are officially certified.",
        "Align your Statement of Purpose (SOP) with the funding objectives."
      ]
    };
  }
}

module.exports = new AiChecklistService();
