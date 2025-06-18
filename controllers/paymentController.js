// const ServiceRequest = require('../models/serviceRequest');
// const Payment = require('../models/payment');
// const Notification = require('../models/notification');
// const { initiatePayment, verifyPayment } = require('../utils/paymentGateway');

// exports.createPayment = async (req, res) => {
//   try {
//     const { serviceRequestId } = req.body;
//     const serviceRequest = await ServiceRequest.findById(serviceRequestId);
    
//     if (!serviceRequest) {
//       return res.status(404).json({ success: false, message: 'Service request not found' });
//     }
    
//     if (serviceRequest.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: 'Not authorized' });
//     }
    
//     const paymentData = {
//       amount: serviceRequest.amount * 100,
//       currency: 'INR',
//       receipt: `receipt_${serviceRequestId}`,
//       notes: {
//         serviceRequestId: serviceRequestId.toString(),
//         userId: req.user._id.toString()
//       }
//     };
    
//     const payment = await initiatePayment(paymentData);
    
//     // Save payment record
//     const paymentRecord = new Payment({
//       serviceRequestId,
//       userId: req.user._id,
//       amount: serviceRequest.amount,
//       paymentId: payment.id,
//       status: 'created'
//     });
    
//     await paymentRecord.save();
    
//     res.status(200).json({ 
//       success: true, 
//       payment 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.verifyPayment = async (req, res) => {
//   try {
//     const { paymentId, orderId } = req.body;
//     const payment = await verifyPayment(paymentId);
    
//     if (payment.status !== 'captured') {
//       return res.status(400).json({ success: false, message: 'Payment failed' });
//     }
    
//     // Update payment record
//     const paymentRecord = await Payment.findOneAndUpdate(
//       { paymentId },
//       { status: 'completed', paymentDate: new Date() },
//       { new: true }
//     );
    
//     // Update service request
//     await ServiceRequest.findByIdAndUpdate(
//       paymentRecord.serviceRequestId,
//       { paymentStatus: 'paid' }
//     );
    
//     // Create notification
//     await Notification.create({
//       userId: paymentRecord.userId,
//       title: 'Payment Successful',
//       message: `Your payment of ₹${paymentRecord.amount} was successful`,
//       type: 'payment'
//     });
    
//     res.status(200).json({ 
//       success: true, 
//       message: 'Payment verified successfully' 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getPaymentHistory = async (req, res) => {
//   try {
//     const payments = await Payment.find({ userId: req.user._id })
//       .populate('serviceRequestId', 'serviceType description')
//       .sort({ createdAt: -1 });
    
//     res.status(200).json({ 
//       success: true, 
//       payments 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };