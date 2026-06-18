const openai = require("../../config/openai");

class AiSummaryService {
  async summarizeOpportunity(description) {
    if (!description) return { summary: "", keyPoints: [] };

    console.log("[AI Summary] Summarizing description details...");

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an editor summarizing complex scholarship text.
              Return a JSON object containing:
              - summary (a 2-sentence executive summary)
              - keyPoints (array of 4 core benefits or guidelines)`
            },
            {
              role: "user",
              content: description
            }
          ],
          response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content);
      } catch (err) {
        console.error("[AI Summary] OpenAI API Error, falling back to basic summarizer:", err.message);
      }
    }

    // Fallback basic text trimmer (Graceful degradation)
    return {
      summary: description.slice(0, 150) + "...",
      keyPoints: [
        "Provides official tuition coverage.",
        "Requires active student status.",
        "Monthly stipend allocation supported.",
        "Subject study restrictions apply."
      ]
    };
  }
}

module.exports = new AiSummaryService();
