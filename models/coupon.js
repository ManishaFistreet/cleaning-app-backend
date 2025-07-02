const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    discountValue: { type: Number, required: true },
    maxDiscount: { type: Number, default: null },
    minOrderValue: { type: Number, default: 0 },
    usageLimit: { type: Number, default: null },
    perUserLimit: { type: Number, default: null },
    usedBy: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            usedCount: { type: Number, default: 0 }
        }
    ],
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);