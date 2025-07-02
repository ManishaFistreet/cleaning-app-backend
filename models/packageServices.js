const mongoose = require('mongoose');
const packageServiceSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  mappedServiceCode: String,
  packageName: String,
  packagePriceId: String,
  packagePrice: Number,
  mappedPriceMaster: String,
  packageDetail: String,
  packageImageWeb: String,
  packageImageApp: String,
  column1: String,
  column2: String,
  column3: String,
  column4: String
});

module.exports = mongoose.model('PackageService', packageServiceSchema);