const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/orderBookingController');

router.post('/create', bookingController.createBooking);
router.get('/:booking_id', bookingController.getBookingById);
router.get('/', bookingController.getBookings);

module.exports = router;