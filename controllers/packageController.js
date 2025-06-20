const PackageService = require('../models/packageServices');

exports.createPackage = async (req, res) => {
  try {
    const pkg = new PackageService(req.body);
    await pkg.save();
    res.status(201).json(pkg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPackages = async (req, res) => {
  const packages = await PackageService.find();
  res.json(packages);
};

exports.updatePackage = async (req, res) => {
  try {
    const pkg = await PackageService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pkg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    await PackageService.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};