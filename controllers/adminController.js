const User = require('../models/user');
const ServiceRequest = require('../models/serviceRequest');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password -otp -otpExpires')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      users 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllServicePersons = async (req, res) => {
  try {
    const servicePersons = await User.find({ role: 'service_person' })
      .select('-password -otp -otpExpires')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      servicePersons 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate('userId', 'name phone')
      .populate('assignedTo', 'name phone')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      requests 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveServicePerson = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user || user.role !== 'service_person') {
      return res.status(404).json({ success: false, message: 'Service person not found' });
    }
    
    user.isApproved = true;
    await user.save();
    
    res.status(200).json({ 
      success: true, 
      message: 'Service person approved successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};