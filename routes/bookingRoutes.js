const express = require('express');
const { createBooking, getAllBookings, getBookingsByUser, updateConfirmationStatus, rescheduleBooking, assignServicePerson, getBookingById } = require('../controllers/bookingController');
const router = express.Router();

router.post('/create', createBooking);

router.get('/admin', getAllBookings);

router.get('/my-bookings/:userId', getBookingsByUser);

router.put('/update-status/:id', updateConfirmationStatus);

router.put('/reschedule/:id', rescheduleBooking);

router.put('/assign/:bookingId', assignServicePerson);

router.get('/:id', getBookingById);
module.exports = router;