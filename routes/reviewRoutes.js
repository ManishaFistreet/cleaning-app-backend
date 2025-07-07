const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, reviewController.createReview);
router.get("/review", authMiddleware, reviewController.getReviews);

module.exports = router;