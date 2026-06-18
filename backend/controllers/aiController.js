const aiSearchService = require("../services/ai/aiSearchService");
const aiEligibilityService = require("../services/ai/aiEligibilityService");
const aiSummaryService = require("../services/ai/aiSummaryService");
const aiChatbotService = require("../services/ai/aiChatbotService");
const aiRecommendationService = require("../services/ai/aiRecommendationService");
const aiChecklistService = require("../services/ai/aiChecklistService");

const opportunityService = require("../services/opportunityService");
const profileService = require("../services/profileService");

class AiController {
  async parseSearch(req, res, next) {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ error: "Search query is required.", status: 400 });
      }
      
      const filters = await aiSearchService.parseQuery(query);
      res.status(200).json(filters);
    } catch (err) {
      next(err);
    }
  }

  async checkEligibility(req, res, next) {
    try {
      const { opportunityId } = req.body;
      if (!opportunityId) {
        return res.status(400).json({ error: "Opportunity ID is required.", status: 400 });
      }

      // 1. Fetch user academic profile
      const profile = await profileService.getProfile(req.user.id);
      if (!profile) {
        return res.status(400).json({ error: "Setup your academic profile first to check eligibility.", status: 400 });
      }

      // 2. Fetch target opportunity
      const opportunity = await opportunityService.getOpportunityById(opportunityId);
      if (!opportunity) {
        return res.status(404).json({ error: "Opportunity not found.", status: 404 });
      }

      // 3. Compute eligibility
      const result = await aiEligibilityService.checkEligibility(profile, opportunity);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getSummary(req, res, next) {
    try {
      const { opportunityId } = req.body;
      if (!opportunityId) {
        return res.status(400).json({ error: "Opportunity ID is required.", status: 400 });
      }

      const opportunity = await opportunityService.getOpportunityById(opportunityId);
      if (!opportunity) {
        return res.status(404).json({ error: "Opportunity not found.", status: 404 });
      }

      const summary = await aiSummaryService.summarizeOpportunity(opportunity.description);
      res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  }

  async askChatbot(req, res, next) {
    try {
      const { opportunityId, question } = req.body;
      if (!opportunityId || !question) {
        return res.status(400).json({ error: "Opportunity ID and question are required.", status: 400 });
      }

      const opportunity = await opportunityService.getOpportunityById(opportunityId);
      if (!opportunity) {
        return res.status(404).json({ error: "Opportunity not found.", status: 404 });
      }

      const answer = await aiChatbotService.askQuestion(opportunity, question);
      res.status(200).json({ answer });
    } catch (err) {
      next(err);
    }
  }

  async getRecommendations(req, res, next) {
    try {
      // 1. Fetch user academic profile
      const profile = await profileService.getProfile(req.user.id);
      if (!profile) {
        return res.status(200).json([]);
      }

      // 2. Fetch active opportunities from DB
      const optResult = await opportunityService.getOpportunities({ limit: 100 });
      const opportunities = optResult.data;

      // 3. Fallback/merge with server-side mock opportunities
      const { MOCK_OPPORTUNITIES } = require("../data/mockOpportunities");
      const normalizedMocks = MOCK_OPPORTUNITIES.map(found => ({
        id: found.id,
        title: found.title,
        description: found.description,
        official_source_url: found.officialUrl,
        application_url: found.officialUrl,
        status: "active",
        category: found.type,
        funding_type: found.fundingType,
        amount_value: found.amount,
        currency: found.currency,
        gpa_min: found.gpaMin,
        ielts_min: found.ieltsMin,
        toefl_min: found.toeflMin,
        levels: found.academicLevels,
        disciplines: found.disciplines,
        required_documents: found.requiredDocuments,
        deadlines: found.deadline ? [{ deadline_date: found.deadline, description: "Application Deadline" }] : []
      }));

      const combined = [...opportunities];
      for (const mock of normalizedMocks) {
        if (!combined.some(x => x.id === mock.id)) {
          combined.push(mock);
        }
      }

      // 4. Compute recommendations
      const recommendations = await aiRecommendationService.getRecommendations(profile, combined);
      res.status(200).json(recommendations);
    } catch (err) {
      next(err);
    }
  }

  async getChecklist(req, res, next) {
    try {
      const { opportunityId } = req.body;
      if (!opportunityId) {
        return res.status(400).json({ error: "Opportunity ID is required.", status: 400 });
      }

      // 1. Fetch user academic profile if logged in
      let profile = null;
      if (req.user) {
        profile = await profileService.getProfile(req.user.id);
      }

      // 2. Fetch target opportunity
      const opportunity = await opportunityService.getOpportunityById(opportunityId);
      if (!opportunity) {
        return res.status(404).json({ error: "Opportunity not found.", status: 404 });
      }

      // 3. Compute checklist
      const result = await aiChecklistService.generateChecklist(profile, opportunity);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AiController();
