const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'service_person', 'admin'], default: 'user' },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  serviceDetails: {
    categories: [String],
    experienceYears: Number,
    availability: {
      days: [String],
      timeSlots: [String]
    },
    rating: { type: Number, default: 0 },
    totalJobsCompleted: { type: Number, default: 0 }
  },
  profilePhoto: String,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);