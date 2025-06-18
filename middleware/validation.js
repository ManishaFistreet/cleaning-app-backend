// const { body, validationResult } = require('express-validator');

// exports.validateRegistration = [
//   body('name').notEmpty().withMessage('Name is required'),
//   body('email').isEmail().withMessage('Valid email is required'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//   body('phone').notEmpty().withMessage('Phone is required'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ 
//         success: false, 
//         errors: errors.array().map(err => err.msg) 
//       });
//     }
//     next();
//   }
// ];