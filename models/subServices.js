const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentService: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceMaster", required: true },
  image: String,
  price: Number,
  duration: String,
  description: String,
});

module.exports = mongoose.model("SubService", subServiceSchema);