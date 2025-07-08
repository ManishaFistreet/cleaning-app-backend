const OrderBooking = require('../models/orderBookings');
exports.createBooking = async (req, res) => {
  try {
    const {
      booking_id,
      service_code,
      offer_code,
      package_code,
      price_type,
      service_category,
      final_discount_percent,
      total_value,
      taxable_value,
      gst_per_service,
      total_value_per_service,
      gst_per_service_pert,
      grand_total
    } = req.body;

    const newBooking = new OrderBooking({
      booking_id,
      service_code,
      offer_code,
      package_code,
      price_type,
      service_category,
      final_discount_percent,
      total_value,
      taxable_value,
      gst_per_service,
      total_value_per_service,
      gst_per_service_pert,
      grand_total
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created', booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getBookingById = async (req, res) => {
  try {
    const booking = await OrderBooking.findOne({ booking_id: req.params.booking_id });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const orderBookings = await OrderBooking.find();
    res.status(200).json(orderBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch order bookings." });
  }
};