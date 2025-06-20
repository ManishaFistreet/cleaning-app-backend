// models/ServiceCategory.js
const mongoose = require("mongoose");

const serviceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: String,
  description: {type: String, required: true},
});

module.exports = mongoose.model("ServiceCategory", serviceCategorySchema);