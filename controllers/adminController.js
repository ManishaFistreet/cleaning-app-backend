const User = require('../models/user');
const ServiceRequest = require('../models/serviceRequest');

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

    // Set status to 'active'
    user.serviceDetails.status = 'active';

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Service person approved successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateServiceStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const updated = await ServiceRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({ success: true, request: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAdminOverview = async (req, res) => {
  const users = await User.countDocuments();
  const requests = await ServiceRequest.countDocuments();
  const statuses = await ServiceRequest.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const breakdown = statuses.map((s) => ({
    name: s._id || "Pending",
    value: s.count,
  }));

  res.json({ users, requests, breakdown });
};

exports.setUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin", "service_person"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
