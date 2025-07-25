exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateAuthToken = (user) => {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { userId: user._id, phone: user.phone, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};