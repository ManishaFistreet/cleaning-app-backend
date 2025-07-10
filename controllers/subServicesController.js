const SubService = require('../models/subServices');
const mongoose = require('mongoose');
exports.createSubService = async (req, res) => {
  try {
    const { name, parentService, price, duration, description } = req.body;
    const subService = new SubService({
      name,
      parentService,
      price,
      duration,
      description,
      image: req.file?.path
    });
    await subService.save();
    res.status(201).json(subService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSubServices = async (req, res) => {
  const subServices = await SubService.find()
  res.status(200).json(subServices);
}

exports.getServiceWithSubServices = async (req, res) => {
  try {
    const { serviceId } = req.query;
    const filter = serviceId
      ? { parentService: new mongoose.Types.ObjectId(serviceId) }
      : {};
    const subservices = await SubService.find(filter);

    res.status(200).json(subservices);
  } catch (error) {
    console.error("SubService fetch error:", error);
    res.status(500).json({ error: error.message });
  }
};
