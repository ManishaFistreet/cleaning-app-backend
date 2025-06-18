const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.generateAuthToken = (user) => {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { userId: user._id, phone: user.phone, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // should include userId
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};