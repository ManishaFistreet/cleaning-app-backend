const Coupon = require('../models/coupon');

exports.handleApplyCoupon = async (req, res) => {
    const { code, cartTotal, userId } = req.body;

    try {
        const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

        if (!coupon) return res.status(404).json({ error: "Invalid or expired coupon" });

        if (coupon.validUntil && new Date() > coupon.validUntil)
            return res.status(400).json({ error: "Coupon has expired" });

        const userUsage = coupon.usedBy.find(u => u.userId.toString() === userId);
        if (coupon.perUserLimit && userUsage?.usedCount >= coupon.perUserLimit)
            return res.status(400).json({ error: "You have already used this coupon" });


        const totalUsed = coupon.usedBy.reduce((acc, u) => acc + u.usedCount, 0);
        if (coupon.usageLimit && totalUsed >= coupon.usageLimit)
            return res.status(400).json({ error: "Coupon usage limit reached" });

        let discount = 0;
        if (coupon.discountType === "percentage") {
            discount = (cartTotal * coupon.discountValue) / 100;
            if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
        } else {
            discount = coupon.discountValue;
        }

        const finalTotal = Math.max(cartTotal - discount, 0);
        if (finalTotal < coupon.minOrderValue) {
            return res.status(400).json({
                error: `Minimum order value of ₹${coupon.minOrderValue} not met. Current total is ₹${finalTotal}.`
            });
        }

        if (userUsage) {
            userUsage.usedCount += 1;
        } else {
            coupon.usedBy.push({ userId, usedCount: 1 });
        }

        await coupon.save();
        res.json({
            success: true,
            discount,
            finalTotal,
            appliedCoupon: {
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
            },
            message: `Coupon applied! You saved ₹${discount}`,
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.handleCreateCoupon = async (req, res) => {
    const
        {
            code,
            discountType,
            discountValue,
            maxDiscount,
            minOrderValue,
            usageLimit,
            perUserLimit,
            validFrom,
            validUntil,
        } = req.body;
    if (!code || !discountType || !discountValue || !validFrom || !validUntil) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() })
        if (existingCoupon) {
            return res.status(400).json({ error: "Coupon code already exists." });
        }
        const coupon = new Coupon({
            code: code.toUpperCase(),
            discountType,
            discountValue,
            maxDiscount,
            minOrderValue,
            usageLimit,
            perUserLimit, 
            isActive: true,
            validFrom: new Date(validFrom),
            validUntil: new Date(validUntil),
        })
        await coupon.save();
        return res.status(201).json({ message: "Coupon created successfully.", coupon });
    }
    catch (error) {
        console.error("Error creating coupon:", error);
        return res.status(500).json({ error: "Internal server error." });
    }

}

exports.handleListCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        return res.status(200).json(coupons);
    } catch (error) {
        console.error("Error fetching coupons:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}