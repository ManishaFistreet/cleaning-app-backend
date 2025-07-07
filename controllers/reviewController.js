const Review = require('../models/review');

exports.createReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    const review = new Review({
      user: req.user._id,
      comment,
      rating,
    });

    await review.save();
    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating review' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name profilePhoto')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};