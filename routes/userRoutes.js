const express = require('express');
const router = express.Router();

const {
  sendOTP,
  verifyOTP,
  register,
  createServiceRequest,
  getUserRequests,
  updateUserInfo,
  getAllUsers,
  getAllServicePersons,
  getUserProfile,
} = require('../controllers/userController');

const { authMiddleware } = require('../middleware/auth');

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

router.post('/register', register);

router.post('/service-request', authMiddleware, createServiceRequest);
router.get('/service-requests', authMiddleware, getUserRequests);

router.put('/update', authMiddleware, updateUserInfo);

router.get('/profile', authMiddleware, getUserProfile);

router.get('/all',getAllUsers);

router.get('/service-person/all',getAllServicePersons)

module.exports = router;