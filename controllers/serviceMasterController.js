const ServiceMaster = require('../models/serviceMaster');
const mongoose = require('mongoose');
const SubService = require('../models/subServices');

exports.getMessage = async (req, res) => {
  const key = "Hello World"
  res.status(201).json(key)
}

exports.createService = async (req, res) => {
  try {
    const {
      serviceCode,
      serviceName,
      serviceDetail,
      minHours,
      maxHours,
      currentActivePrice,
      priceType,
      minPersonRequired,
      serviceCategory,
      column2,
      column3,
      column4,
      column5,
      column6,
      serviceActiveStatus,
      serviceMappedAdvertisementUniqueId
    } = req.body;
    
    const serviceWebImage = req.files?.serviceWebImage?.[0]?.path || null;
    const serviceAppIcon = req.files?.serviceAppIcon?.[0]?.path || null;

    const newService = new ServiceMaster({
      serviceCode,
      serviceName,
      serviceDetail,
      minHours,
      maxHours,
      currentActivePrice,
      priceType,
      minPersonRequired,
      serviceCategory,
      column2,
      column3,
      column4,
      column5,
      column6,
      serviceActiveStatus,
      serviceMappedAdvertisementUniqueId,
      serviceWebImage,
      serviceAppIcon
    });

    await newService.save();
    res.status(201).json(newService);
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

exports.getServiceById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid service ID" });
  }

  try {
    const services = await ServiceMaster.findById(id);
    if (!services) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(services);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    res.status(500).json({ message: error.message });
  }
};
// exports.getServiceWithSubServices = async (req, res) => {
//   try {
//     const serviceId = req.params.id;
//     const service = await ServiceMaster.findById(serviceId);
//     const subservices = await SubService.find({ parentService: serviceId });
//     res.json({ service, subservices });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch service details" });
//   }
// };