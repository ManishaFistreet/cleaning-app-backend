const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    serviceRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceRequest', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    status: { type: String, enum: ['created', 'completed', 'failed'], default: 'created' },
    paymentDate: Date,
    paymentMethod: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Payment", paymentSchema);