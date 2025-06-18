// const User = require('../models/User');
const Notification = require('../models/notification');
const ServiceRequest = require('../models/serviceRequest');

exports.getAvailableJobs = async (req, res) => {
  try {
    const jobs = await ServiceRequest.find({ 
      status: 'pending',
      serviceType: req.user.serviceType
    }).populate('userId', 'name phone address');
    
    res.status(200).json({ 
      success: true, 
      jobs 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.acceptJob = async (req, res) => {
  try {
    const job = await ServiceRequest.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    job.assignedTo = req.user._id;
    job.status = 'assigned';
    await job.save();

    await Notification.create({
      userId: job.userId,
      title: 'Service Person Assigned',
      message: `Your service request has been assigned to ${req.user.name}`,
      type: 'service'
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Job accepted successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await ServiceRequest.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    if (job.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    job.status = status;
    if (status === 'completed') {
      job.completionDate = new Date();
    }
    
    await job.save();
    
    res.status(200).json({ 
      success: true, 
      message: 'Job status updated successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// exports.uploadProof = async (req, res) => {
//   try {
//     const job = await ServiceRequest.findById(req.body.jobId);
    
//     if (!job) {
//       return res.status(404).json({ success: false, message: 'Job not found' });
//     }
    
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'No file uploaded' });
//     }
    
//     if (job.status === 'in_progress') {
//       job.beforePhotos.push(req.file.path);
//     } else if (job.status === 'completed') {
//       job.afterPhotos.push(req.file.path);
//     }
    
//     await job.save();
    
//     res.status(200).json({ 
//       success: true, 
//       message: 'Proof uploaded successfully' 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };