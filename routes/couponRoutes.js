const express = require('express');
const {
    handleApplyCoupon,
    handleCreateCoupon,
    handleListCoupons
} = require("../controllers/couponController.js"); 
const router = express.Router();

router.post("/apply", handleApplyCoupon); 
router.post("/create", handleCreateCoupon);
router.get("/list", handleListCoupons); 

module.exports = router;