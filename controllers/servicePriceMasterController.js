const ServicePriceMaster = require('../models/servicePriceMaster');
const ServiceMaster = require('../models/serviceMaster');

exports.createPrice = async (req, res) => {
  try {
    const service = await ServiceMaster.findOne({ serviceCode: req.body.serviceCode });
    if (!service) {
      return res.status(404).json({ message: 'Service with this code not found' });
    }
    const price = new ServicePriceMaster(req.body);
    await price.save();

    const populatedPrice = await ServicePriceMaster.findById(price._id).populate({
      path: 'serviceCode',
      model: 'ServiceMaster',
      localField: 'serviceCode',
      foreignField: 'serviceCode',
      justOne: true
    });

    res.status(201).json(populatedPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPrices = async (req, res) => {
  try {
    const prices = await ServicePriceMaster.find().populate({
      path: 'serviceCode',
      model: 'ServiceMaster',
      localField: 'serviceCode',
      foreignField: 'serviceCode',
      justOne: true
    });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updatePrice = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.body.serviceCode) {
      const service = await ServiceMaster.findOne({ serviceCode: req.body.serviceCode });
      if (!service) {
        return res.status(404).json({ message: 'Service with this code not found' });
      }
      updateData.serviceCode = service._id;
    }
    const price = await ServicePriceMaster.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(price);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deletePrice = async (req, res) => {
  try {
    await ServicePriceMaster.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
