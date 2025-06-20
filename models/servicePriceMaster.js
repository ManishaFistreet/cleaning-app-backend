const mongoose = require('mongoose');

const servicePriceSchema = new mongoose.Schema({
  serviceCode: { type: String, required: true },
  actualPrice: { type: Number, required: true },
  uniqueId: { type: String, required: true },
  priceType: String,
  showoffPrice: Number,
  offerCode: String,
  minDiscount: Number,
  maxDiscount: Number,
  specialDiscount: Number,
  offerDiscount: Number,
  offerStart: Date,
  offerEnd: Date,
  proportionalChargesExtraHours: Number,
  proportionalExtraHours: Number
});

module.exports = mongoose.model('ServicePriceMaster', servicePriceSchema);