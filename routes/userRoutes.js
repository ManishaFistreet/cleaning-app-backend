const express = require('express');
const router = express.Router();
const {sendOTP, verifyOTP, register, createServiceRequest, getUserRequests, updateUserInfo} = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');
// const { validateRegistration } = require('../middleware/validation');

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

router.post('/register', register);
router.post('/service-request', authMiddleware, createServiceRequest);
router.get('/service-requests', authMiddleware, getUserRequests);

router.put('/update', authMiddleware, updateUserInfo);

module.exports = router;