const mongoose = require('mongoose');

const CustomerLocationSchema = new mongoose.Schema({
  address_code: {
    type: String,
    required: true,
    ref: 'Customer' 
  },
  address_info: { type: String, required: true },
  address_city: { type: String, required: true },
  address_state: { type: String, required: true },
  address_country: { type: String, required: true },

  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },

  geo_map_selected_address_info: { type: String }
});

module.exports = mongoose.model('CustomerLocation', CustomerLocationSchema);