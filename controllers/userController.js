const { sendWhatsAppOTP } = require('../utils/whatsapp');
const User = require('../models/user');
const { generateOTP, generateAuthToken } = require('../utils/otp');
const ServiceRequest = require('../models/serviceRequest');

exports.sendOTP = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ success: false, message: 'Phone number is required' });
        }

        const otp = generateOTP();
        const otpExpiry = Date.now() + 5 * 60 * 1000;

        let user = await User.findOne({ phone });
        if (!user) {
            user = new User({ phone, otp, otpExpiry });
        } else {
            user.otp = otp;
            user.otpExpiry = otpExpiry;
        }

        await user.save();
        await sendWhatsAppOTP(phone, otp);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            tempUserId: user._id
        });
    } catch (error) {
        console.error('OTP send error:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (String(user.otp) !== String(otp)) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        user.isVerified = true;
        await user.save();

        let token;
        if (user.name && user.email) {
            token = generateAuthToken(user);
        }

        res.status(200).json({
            success: true,
            message: 'OTP verified successfully',
            isRegistered: !!user.name,
            token: token || null,
            user: user.name ? {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profilePhoto: user.profilePhoto,
            } : null,
        });

    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ success: false, message: 'OTP verification failed', error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            role,
            address,
            profilePhoto,
            serviceDetails
        } = req.body;

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found. Please verify OTP first' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ success: false, message: 'Please verify your phone number first' });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists && emailExists._id.toString() !== user._id.toString()) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        user.name = name;
        user.email = email;
        user.password = password;
        user.profilePhoto = profilePhoto || user.profilePhoto;

        const allowedRoles = ['user', 'admin', 'service_person'];
        if (role && allowedRoles.includes(role)) {
            user.role = role;
        }

        if (address) {
            user.address = address;
        }

        if (role === 'service_person' && serviceDetails) {
            user.serviceDetails = serviceDetails;
        }

        await user.save();

        const token = generateAuthToken(user);

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profilePhoto: user.profilePhoto,
                address: user.address,
                serviceDetails: user.serviceDetails,
            },
            token,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
    }
};

exports.createServiceRequest = async (req, res) => {
    try {
        const { serviceType, description, address, scheduledDate } = req.body;

        const serviceRequest = new ServiceRequest({
            userId: req.user._id,
            serviceType,
            description,
            address,
            scheduledDate
        });

        await serviceRequest.save();

        res.status(201).json({ success: true, serviceRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUserRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, email, address, profilePhoto } = req.body;

        const updateData = { name, email, profilePhoto };
        if (address) updateData.address = address;

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        res.status(200).json({
            success: true,
            message: 'User info updated successfully',
            user
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ success: false, message: 'Failed to update user info', error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password -otp -otpExpiry');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch user profile', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' })
            .select('-password -otp -otpExpires')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllServicePersons = async (req, res) => {
    try {
        const servicePersons = await User.find({ role: 'service_person' })
            .select('-password -otp -otpExpires')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            servicePersons
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};