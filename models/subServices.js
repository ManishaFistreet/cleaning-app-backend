const mongoose = require("mongoose");

const subServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceCategory" },
  price: Number,
  duration: String,
  description: String,
});

module.exports = mongoose.model("SubService", subServiceSchema);