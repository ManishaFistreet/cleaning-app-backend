const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const OrderBookingSchema = new mongoose.Schema({
  unique_id: { type: String, default: uuidv4, unique: true },
  booking_id: { type: String, required: true, unique: true },

  service_code: { type: String, required: true },
  offer_code: { type: String },
  package_code: { type: String },
  price_type: { type: String }, // e.g. fixed, hourly, dynamic

  service_category: { type: String }, // e.g. plumbing, salon, etc.

  final_discount_percent: { type: Number, default: 0 }, // % discount
  total_value: { type: Number, required: true },        // Base before discounts and tax
  taxable_value: { type: Number, required: true },      // Value eligible for tax
  gst_per_service: { type: Number, required: true },    // % or absolute tax per service

  total_value_per_service: { type: Number, required: true }, // Post-tax per service
  grand_total: { type: Number, required: true },        // Final amount customer pays

  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderBooking', OrderBookingSchema);