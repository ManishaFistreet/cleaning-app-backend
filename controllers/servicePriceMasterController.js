const ServicePriceMaster = require('../models/servicePriceMaster');

exports.createPrice = async (req, res) => {
  try {
    const price = new ServicePriceMaster(req.body);
    await price.save();
    res.status(201).json(price);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPrices = async (req, res) => {
  const prices = await ServicePriceMaster.find().populate('serviceCode');;
  res.json(prices);
};

exports.updatePrice = async (req, res) => {
  try {
    const price = await ServicePriceMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(price);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePrice = async (req, res) => {
  try {
    await ServicePriceMaster.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};