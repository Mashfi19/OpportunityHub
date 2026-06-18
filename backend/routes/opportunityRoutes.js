const express = require("express");
const opportunityController = require("../controllers/opportunityController");

const router = express.Router();

router.get("/", opportunityController.getOpportunities);
router.get("/:id", opportunityController.getOpportunityById);

module.exports = router;
