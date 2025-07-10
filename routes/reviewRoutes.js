const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', reviewController.createReview);
router.get("/review", reviewController.getReviews);

module.exports = router;