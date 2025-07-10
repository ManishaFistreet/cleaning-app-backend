const express = require("express");
const router = express.Router();
const subServiceController = require("../controllers/subServicesController");

router.post("/", subServiceController.createSubService);
router.get("/sub", subServiceController.getSubServices);
router.get('/', subServiceController.getServiceWithSubServices);

module.exports = router;