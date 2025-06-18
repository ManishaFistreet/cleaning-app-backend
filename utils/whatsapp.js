const axios = require('axios');
const qs = require('querystring');

exports.sendWhatsAppOTP = async (phone, otp) => {
  const message = `Your Cleaning App login OTP is: ${otp}`;
  const token = 'cm8to2dl77kzrlbr9hsmm2lf0';
  const fullPhone = '91' + phone.replace(/^(\+91)?/, '');

  const params = {
    token,
    phone: fullPhone,
    message
  };

  const url = `http://webapp.fistreet.in/api/sendText?${qs.stringify(params)}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error('WhatsApp OTP Error:', err.message);
    throw new Error('Failed to send WhatsApp message');
  }
};