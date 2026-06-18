const opportunityService = require("../services/opportunityService");

class OpportunityController {
  async getOpportunities(req, res, next) {
    try {
      const {
        q,
        countryId,
        universityId,
        degreeLevel,
        fundingTypeId,
        categoryId,
        deadlineBefore,
        sortBy,
        page,
        limit
      } = req.query;

      const results = await opportunityService.getOpportunities({
        q,
        countryId: countryId ? parseInt(countryId) : undefined,
        universityId,
        degreeLevel,
        fundingTypeId: fundingTypeId ? parseInt(fundingTypeId) : undefined,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        deadlineBefore,
        sortBy,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10
      });

      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  async getOpportunityById(req, res, next) {
    try {
      const { id } = req.params;
      const opportunity = await opportunityService.getOpportunityById(id);
      
      if (!opportunity) {
        return res.status(404).json({ error: "Opportunity listing not found.", status: 404 });
      }

      res.status(200).json(opportunity);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OpportunityController();
