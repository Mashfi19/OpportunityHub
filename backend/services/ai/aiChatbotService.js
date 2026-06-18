const openai = require("../../config/openai");

class AiChatbotService {
  async askQuestion(opportunity, userQuestion) {
    if (!opportunity || !userQuestion) {
      return "I'm sorry, I could not process your request. Please supply an opportunity context and a question.";
    }

    console.log(`[AI Chatbot] Querying FAQ assistant for: "${opportunity.title}"`);

    const contextInstruction = `
      You are an expert academic assistant answering questions about the following opportunity:
      - Title: ${opportunity.title}
      - Host: ${opportunity.host}
      - Location: ${opportunity.location}
      - Type: ${opportunity.category}
      - Funding: ${opportunity.funding_type}
      - Description: ${opportunity.description}
      - Benefits: ${opportunity.amount_value || opportunity.stipend_amount || "Fully Funded"}
      
      Instructions:
      - Answer questions accurately using ONLY the details provided above.
      - If the answer is not mentioned in the details, politely reply that the official listing does not state this information, and direct the user to visit the official URL: ${opportunity.official_source_url}.
      - Keep answers concise (max 3 sentences).
    `;

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: contextInstruction
            },
            {
              role: "user",
              content: userQuestion
            }
          ]
        });

        return response.choices[0].message.content.trim();
      } catch (err) {
        console.error("[AI Chatbot] OpenAI API Error, falling back to rule responder:", err.message);
      }
    }

    // Fallback: Rule-based static responder
    const q = userQuestion.toLowerCase();
    
    if (q.includes("deadline")) {
      return `The application deadline for this program is listed as: ${opportunity.deadlines?.[0]?.deadline_date || "Rolling basis"}.`;
    }
    if (q.includes("how to apply")) {
      return `To apply for this opportunity, please visit the official program link at: ${opportunity.official_source_url}.`;
    }
    if (q.includes("value") || q.includes("amount") || q.includes("money")) {
      return `The funding value provided is: ${opportunity.amount_value || opportunity.stipend_amount || "Fully Funded"}.`;
    }

    return `This is a verified listing hosted by ${opportunity.host} in ${opportunity.location}. For specific details, please check the official site: ${opportunity.official_source_url}`;
  }
}

module.exports = new AiChatbotService();
