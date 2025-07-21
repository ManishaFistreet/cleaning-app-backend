const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const servicePersonRoutes = require('./routes/servicePersonRoutes');
const adminRoutes = require('./routes/adminRoutes');
const subServiceRoutes = require('./routes/subServicesRoutes');
const customerRoutes = require('./routes/customerRoutes');
const serviceMasterRoutes = require('./routes/serviceMasterRoutes');
const servicePriceRoutes = require('./routes/servicePriceRoutes');
const showcaseRoutes = require('./routes/showcaseRoutes');
const packageRoutes = require('./routes/packageRoutes');
const locationRoutes = require('./routes/locationRoutes');
const orderBookingRoutes = require('./routes/orderBookingRoutes');
const couponRoutes = require('./routes/couponRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/user', userRoutes);
app.use('/api/service-person', servicePersonRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/service-master', serviceMasterRoutes);
app.use('/api/service-price', servicePriceRoutes);
app.use('/api/showcase', showcaseRoutes);
app.use('/api/package', packageRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/sub-services', subServiceRoutes);
app.use('/api/bookings', bookingRoutes);

module.exports = app;