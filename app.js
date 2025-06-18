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
// const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/user', userRoutes);
app.use('/api/service-person', servicePersonRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/payment', paymentRoutes);

module.exports = app;