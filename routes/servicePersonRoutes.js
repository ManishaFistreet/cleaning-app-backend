const express = require('express');
const router = express.Router();
const servicePersonController = require('../controllers/servicePersonController');
const { authMiddleware } = require('../middleware/auth');

router.get('/available-jobs', authMiddleware, servicePersonController.getAvailableJobs);
router.post('/accept-job/:jobId', authMiddleware, servicePersonController.acceptJob);
router.post('/job-status/:jobId', authMiddleware, servicePersonController.updateJobStatus);
// router.post('/upload-proof', authMiddleware, servicePersonController.uploadProof);

module.exports = router;