const ServiceCategory = require("../models/services");
const SubService = require("../models/subServices");

exports.getAllServices = async (req, res) => {
  try {
    const categories = await ServiceCategory.find();

    const data = await Promise.all(
      categories.map(async (cat) => {
        const subServices = await SubService.find({ category: cat._id });
        return {
          _id: cat._id,
          name: cat.name,
          icon: cat.icon,
          subServices,
        };
      })
    );

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const cat = await ServiceCategory.create({ name });
    res.json({ success: true, category: cat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createSubService = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const sub = await SubService.create({ name, price, category });
    
    await ServiceCategory.findByIdAndUpdate(category, {
      $push: { subServices: sub._id },
    });

    res.json({ success: true, subService: sub });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};