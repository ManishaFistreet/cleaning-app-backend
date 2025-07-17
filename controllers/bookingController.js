const Booking = require('../models/bookings');
const ServiceMaster = require('../models/serviceMaster');
const User = require('../models/user');

exports.createBooking = async (req, res) => {
    try {
        const { userId, services: incomingServices, schedule, address, paymentStatus } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId is required' });
        }

        const serviceDocs = await ServiceMaster.find({
            _id: { $in: incomingServices.map((s) => s.serviceId) },
        });

        const services = incomingServices.map((s) => {
            const serviceData = serviceDocs.find((doc) => doc._id.toString() === s.serviceId);
            if (!serviceData) throw new Error(`Service ${s.serviceId} not found`);

            const price = serviceData.currentActivePrice;
            const gst = 18; // or serviceData.gst if defined
            const gstAmount = (price * gst) / 100;
            const totalWithGst = price + gstAmount;

            return {
                serviceId: s.serviceId,
                serviceCode: serviceData.serviceCode, // ✅ Include this
                quantity: s.quantity,
                price,
                gstPercentage: gst,
                gstAmount,
                totalWithGst,
            };
        });

        const subtotal = services.reduce((acc, s) => acc + s.price * s.quantity, 0);
        const gstTotal = services.reduce((acc, s) => acc + s.gstAmount * s.quantity, 0);
        const grandTotal = subtotal + gstTotal;
        if ([subtotal, gstTotal, grandTotal].some((v) => isNaN(v))) {
            throw new Error("Subtotal or GST Total is NaN");
        }

        const booking = new Booking({
            user: userId,
            services,
            schedule,
            address,
            paymentStatus: paymentStatus || 'pending',
            confirmationStatus: 'pending',
            subtotal,
            gstTotal,
            grandTotal,
        });

        await booking.save();

        res.status(201).json({ success: true, message: 'Booking created', booking });
    } catch (error) {
        console.error('Create Booking Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user')
            .populate('services.serviceId')
            .populate('assignedTo');
        res.status(200).json({ success: true, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching bookings' });
    }
};

exports.getBookingsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });

        const bookings = await Booking.find({ user: userId }).populate("services.serviceId");

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error("Get Bookings Error:", error);
        res.status(500).json({ success: false, message: "Could not fetch user bookings" });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.findByIdAndUpdate(id, { status: "cancelled" });
        res.status(200).json({ success: true, message: "Booking cancelled" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Could not cancel booking" });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name phone email')
            .populate('services.serviceId');
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

        res.status(200).json({ success: true, booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.rescheduleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { newDate, newTime } = req.body;

        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

        const now = new Date();
        const scheduledDateTime = new Date(`${booking.schedule.date}T${booking.schedule.time}`);

        const diffInHours = (scheduledDateTime - now) / (1000 * 60 * 60);
        if (diffInHours < 24) {
            return res.status(400).json({ success: false, message: "Rescheduling not allowed within 24 hours" });
        }

        booking.schedule.date = newDate;
        booking.schedule.time = newTime;
        await booking.save();

        res.status(200).json({ success: true, message: "Booking rescheduled", booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateConfirmationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'confirmed', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value' });
        }

        const updated = await Booking.findByIdAndUpdate(id, { confirmationStatus: status }, { new: true });
        res.status(200).json({ success: true, booking: updated });
    } catch (error) {
        console.error('Update Confirmation Status Error:', error);
        res.status(500).json({ success: false, message: 'Could not update status' });
    }
};

exports.assignServicePerson = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { servicePersonId } = req.body;

        const servicePerson = await User.findById(servicePersonId);
        if (!servicePerson || servicePerson.role !== 'service_person') {
            return res.status(400).json({ success: false, message: "Invalid service person ID" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { assignedTo: servicePersonId },
            { new: true }
        ).populate('assignedTo', 'name phone');

        res.status(200).json({ success: true, message: "Service person assigned", booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAssignedBookings = async (req, res) => {
    try {
        const servicePersonId = req.user.userId;
        const bookings = await Booking.find({ assignedTo: servicePersonId })
            .populate('user', 'name phone')
            .populate('services.serviceId');

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};