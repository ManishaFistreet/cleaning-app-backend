const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminMiddleware, authMiddleware } = require('../middleware/auth');

// router.get('/users', adminMiddleware, adminController.getAllUsers);
// router.get('/service-person', adminMiddleware, adminController.getAllServicePersons);
router.get('/service-requests', adminMiddleware, adminController.getAllServiceRequests);
router.post('/approve-service-person/:id', adminMiddleware, adminController.approveServicePerson);
router.put("/service-requests/:requestId", authMiddleware, adminController.updateServiceStatus);
router.get("/overview", authMiddleware, adminController.getAdminOverview);
router.put('/set-role', authMiddleware, adminController.setUserRole);

module.exports = router;