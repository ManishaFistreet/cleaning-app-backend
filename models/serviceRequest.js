const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, required: true },
  description: { type: String, required: true },
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
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  beforePhotos: [String],
  afterPhotos: [String],
  scheduledDate: Date,
  completionDate: Date,
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);