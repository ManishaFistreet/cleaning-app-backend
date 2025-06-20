const mongoose = require('mongoose');

const serviceAddShowcaseSchema = new mongoose.Schema({
    uniqueId: { type: String, required: true },
    adDetail: String,
    adTitle: String,
    adImageApp: String,
    adImageWeb: String,
    adActiveStatus: Boolean,
    showcaseStartTime: String,
    showcaseEndTime: String,
    showcaseStartDate: Date,
    showcaseEndDate: Date,
    adPriceId: String
});

module.exports = mongoose.model('serviceAddShowcase', serviceAddShowcaseSchema);