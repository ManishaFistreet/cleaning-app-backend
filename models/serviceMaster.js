const mongoose = require('mongoose');

const serviceMasterSchema = new mongoose.Schema({
  serviceCode: { type: String, required: true, unique: true },
  serviceName: { type: String, required: true },
  serviceDetail: String,
  minHours: Number,
  maxHours: Number,
  currentActivePrice: Number,
  showoffPriceTag: String,
  priceType: String,
  minPersonRequired: Number,
  serviceCategory: String,
  column2: String,
  column3: String,
  column4: String,
  column5: String,
  column6: String,
  serviceActiveStatus: Boolean,
  serviceAppIcon: String,
  serviceWebImage: String,
  serviceMappedAdvertisementUniqueId: String
});

module.exports = mongoose.model('ServiceMaster', serviceMasterSchema);