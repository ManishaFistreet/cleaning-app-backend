const Booking = require('../models/bookings');
const ServiceMaster = require('../models/serviceMaster');

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
            .populate('user', 'name email phone')
            .populate('service', 'title price');

        res.json({ success: true, bookings });
    } catch (error) {
        console.error('Get All Bookings Error:', error);
        res.status(500).json({ success: false, message: 'Could not fetch bookings' });
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