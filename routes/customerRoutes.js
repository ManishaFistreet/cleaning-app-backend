const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/create', customerController.createCustomer);
router.post('/send-otp', customerController.sendOTP);
router.post('/verify-otp', customerController.verifyOTP);
router.get('/:id', customerController.getCustomer);
router.put('/update-login', customerController.updateLoginInfo);

module.exports = router;