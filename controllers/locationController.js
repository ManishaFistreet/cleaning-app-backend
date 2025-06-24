const CustomerLocation = require('../models/customerLocation');
const Customer = require('../models/customer');

// Create or update a location by address_code
exports.upsertLocation = async (req, res) => {
  const {
    address_code,
    address_info,
    address_city,
    address_state,
    address_country,
    longitude,
    latitude,
    geo_map_selected_address_info
  } = req.body;

  // Check if customer with this address_code exists
  const customer = await Customer.findOne({ address_code });
  if (!customer) {
    return res.status(404).json({ error: 'Customer with this address_code not found' });
  }

  const location = await CustomerLocation.findOneAndUpdate(
    { address_code },
    {
      address_info,
      address_city,
      address_state,
      address_country,
      longitude,
      latitude,
      geo_map_selected_address_info
    },
    { upsert: true, new: true }
  );

  res.json({ message: 'Location saved', location });
};

// Get location by address_code
exports.getLocationByAddressCode = async (req, res) => {
  const { address_code } = req.params;

  const location = await CustomerLocation.findOne({ address_code });
  if (!location) return res.status(404).json({ error: 'Location not found' });

  res.json(location);
};