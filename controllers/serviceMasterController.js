const ServiceMaster = require('../models/serviceMaster');

exports.createService = async (req, res) => {
  try {
    const service = new ServiceMaster(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getServices = async (req, res) => {
  const services = await ServiceMaster.find();
  res.json(services);
};

exports.updateService = async (req, res) => {
  try {
    const service = await ServiceMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await ServiceMaster.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};