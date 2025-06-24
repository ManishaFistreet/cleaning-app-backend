const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CustomerSchema = new mongoose.Schema({
  phone_no: { type: String, unique: true, required: true },
  active_status: { type: Boolean, default: false }, // OTP verified
  unique_id: { type: String, default: uuidv4, unique: true },

  first_name: { type: String, required: true },
  second_name: { type: String },
  full_name: { type: String },

  address_code: { type: String, unique: true, required: true },

  account_opened_on: { type: Date, default: Date.now },
  account_opened_by: { type: String, enum: ['app', 'web', 'admin'], required: true },

  referral_code: { type: String },
  referral_by: { type: String }, 

  total_booked_service_count: { type: Number, default: 0 },
  total_success_service_count: { type: Number, default: 0 },
  total_complaint_service_count: { type: Number, default: 0 },

  attached_price_type: { type: String },

  last_logined_on_date: { type: Date },
  last_logined_on_time: { type: String },
  last_logined_location_latitude: { type: Number },
  last_logined_location_longitude: { type: Number },
  last_logined_location_address: { type: String },
  last_logined_by: { type: String, enum: ['app', 'web'] },
  last_logined_unique_id: { type: String },
  ip_address: { type: String }
});

module.exports = mongoose.model('Customer', CustomerSchema);