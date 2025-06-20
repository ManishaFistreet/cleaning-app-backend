const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

router.get("/", serviceController.getAllServices);
router.post("/categories", serviceController.createCategory);
router.post("/sub-services", serviceController.createSubService);

module.exports = router;