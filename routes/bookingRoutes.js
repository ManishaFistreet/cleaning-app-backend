const express = require('express');
const { createBooking, getAllBookings, getBookingsByUser } = require('../controllers/bookingController');
const router = express.Router();

router.post('/create', createBooking);

router.get('/admin', getAllBookings);

router.get('/my-bookings/:userId', getBookingsByUser);

module.exports = router;