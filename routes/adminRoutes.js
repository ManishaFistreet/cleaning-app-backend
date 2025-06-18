const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminMiddleware } = require('../middleware/auth');

router.get('/users', adminMiddleware, adminController.getAllUsers);
router.get('/service-person', adminMiddleware, adminController.getAllServicePersons);
router.get('/service-requests', adminMiddleware, adminController.getAllServiceRequests);
router.post('/approve-service-person/:id', adminMiddleware, adminController.approveServicePerson);

module.exports = router;