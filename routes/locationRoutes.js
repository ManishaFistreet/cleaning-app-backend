const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/upsert', locationController.upsertLocation);
router.get('/:address_code', locationController.getLocationByAddressCode);

module.exports = router;