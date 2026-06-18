const express = require("express");
const directoryController = require("../controllers/directoryController");

const router = express.Router();

router.get("/countries", directoryController.getCountries);
router.get("/universities", directoryController.getUniversities);
router.get("/organizations", directoryController.getOrganizations);

module.exports = router;
