const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    services: [
        {
            serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceMaster' },
            serviceCode: String,
            quantity: Number,
            price: Number,
            gstPercentage: Number,
            gstAmount: Number,
            totalWithGst: Number,
        }
    ],
    schedule: {
        date: { type: String, required: true },
        time: { type: String, required: true },
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
    },
    subtotal: Number,
    gstTotal: Number,
    grandTotal: Number,
}, { timestamps: true });


module.exports = mongoose.model('Booking', bookingSchema);