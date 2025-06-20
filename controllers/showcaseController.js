const ServiceAddShowcase = require('../models/serviceAddShowcase');

exports.createShowcase = async (req, res) => {
  try {
    const showcase = new ServiceAddShowcase(req.body);
    await showcase.save();
    res.status(201).json(showcase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getShowcases = async (req, res) => {
  const showcases = await ServiceAddShowcase.find();
  res.json(showcases);
};

exports.updateShowcase = async (req, res) => {
  try {
    const showcase = await ServiceAddShowcase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(showcase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteShowcase = async (req, res) => {
  try {
    await ServiceAddShowcase.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};