const express = require('express');
const cors = require ('cors');
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
const serviceRoutes = require('./routes/serviceRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
const customerRoutes = require('./routes/customerRoutes');
const serviceMasterRoutes =  require('./routes/serviceMasterRoutes');
const servicePriceRoutes = require('./routes/servicePriceRoutes');
const showcaseRoutes = require('./routes/showcaseRoutes');
const packageRoutes = require('./routes/packageRoutes');
const locationRoutes = require('./routes/locationRoutes');
const orderBookingRoutes = require('./routes/orderBookingRoutes');
const couponRoutes = require('./routes/couponRoutes');


app.use('/api/bookings', orderBookingRoutes);
app.use('/api/user', userRoutes);
app.use('/api/service-person', servicePersonRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services',serviceRoutes);
app.use('/api/service-master', serviceMasterRoutes);
app.use('/api/service-price', servicePriceRoutes);
app.use('/api/showcase', showcaseRoutes);
app.use('/api/package', packageRoutes);
// app.use('/api/payment', paymentRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/coupons', couponRoutes);

module.exports = app;