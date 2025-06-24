const Customer = require('../models/customer');
const { v4: uuidv4 } = require('uuid');

// Create new customer
exports.createCustomer = async (req, res) => {
  try {
    const { phone_no, first_name, second_name, address_code, account_opened_by } = req.body;

    const full_name = `${first_name} ${second_name || ''}`.trim();

    const customer = new Customer({
      phone_no,
      first_name,
      second_name,
      full_name,
      address_code,
      account_opened_by
    });

    await customer.save();
    res.status(201).json({ message: 'Customer created', customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.sendOTP = async (req, res) => {
  const { phone_no } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  res.json({ message: 'OTP sent', otp });
};

exports.verifyOTP = async (req, res) => {
  const { phone_no, otp } = req.body;
  if (otp === '123456') {
    const customer = await Customer.findOneAndUpdate(
      { phone_no },
      { active_status: true },
      { new: true }
    );
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'OTP verified', customer });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLoginInfo = async (req, res) => {
  const {
    phone_no,
    date,
    time,
    latitude,
    longitude,
    address,
    logined_by,
    logined_unique_id,
    ip_address
  } = req.body;

  const customer = await Customer.findOneAndUpdate(
    { phone_no },
    {
      last_logined_on_date: date,
      last_logined_on_time: time,
      last_logined_location_latitude: latitude,
      last_logined_location_longitude: longitude,
      last_logined_location_address: address,
      last_logined_by: logined_by,
      last_logined_unique_id: logined_unique_id,
      ip_address
    },
    { new: true }
  );

  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  res.json({ message: 'Login info updated', customer });
};