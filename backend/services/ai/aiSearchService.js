const openai = require("../../config/openai");

class AiSearchService {
  async parseQuery(naturalQuery) {
    if (!naturalQuery) return {};

    console.log(`[AI Search] Translating natural query: "${naturalQuery}"`);

    // 1. If OpenAI client is active, request structured output
    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an assistant that translates natural language scholarship search queries into database filters. 
              Extract:
              - keyword (e.g. subject major like "Computer Science" or "Physics")
              - country (e.g. "Germany", "United States")
              - degree_level (e.g. "Undergraduate", "Graduate", "PhD")
              - funding_type (e.g. "FullyFunded", "PartiallyFunded")
              - category (e.g. "Scholarship", "Internship", "ResearchGrant")`
            },
            {
              role: "user",
              content: naturalQuery
            }
          ],
          response_format: { type: "json_object" }
        });

        const parsed = JSON.parse(response.choices[0].message.content);
        return parsed;
      } catch (err) {
        console.error("[AI Search] OpenAI API Error, falling back to regex parser:", err.message);
      }
    }

    // 2. Local fallback regex parsing (Graceful degradation)
    const filters = {};
    
    // Keyword subject extraction
    if (naturalQuery.toLowerCase().includes("computer science") || naturalQuery.toLowerCase().includes("cs")) {
      filters.keyword = "Computer Science";
    } else if (naturalQuery.toLowerCase().includes("physics")) {
      filters.keyword = "Physics";
    }

    // Country extraction
    if (naturalQuery.toLowerCase().includes("germany")) {
      filters.country = "Germany";
    } else if (naturalQuery.toLowerCase().includes("usa") || naturalQuery.toLowerCase().includes("united states")) {
      filters.country = "United States";
    }

    // Degree level extraction
    if (naturalQuery.toLowerCase().includes("phd") || naturalQuery.toLowerCase().includes("doctorate")) {
      filters.degree_level = "PhD";
    } else if (naturalQuery.toLowerCase().includes("master") || naturalQuery.toLowerCase().includes("graduate")) {
      filters.degree_level = "Graduate";
    } else if (naturalQuery.toLowerCase().includes("bachelor") || naturalQuery.toLowerCase().includes("undergrad")) {
      filters.degree_level = "Undergraduate";
    }

    // Funding type extraction
    if (naturalQuery.toLowerCase().includes("fully funded") || naturalQuery.toLowerCase().includes("full funding")) {
      filters.funding_type = "FullyFunded";
    }

    return filters;
  }
}

module.exports = new AiSearchService();
