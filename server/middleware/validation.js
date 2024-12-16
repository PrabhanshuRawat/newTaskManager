// const { body, validationResult } = require('express-validator');

// const validateUserInput = [
//   body('name').notEmpty().withMessage('Name is required'),
//   body('email').isEmail().withMessage('Invalid email address'),
//   body('password').isStrongPassword().withMessage('Password must be strong'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];

// module.exports = { validateUserInput };
const { body, validationResult } = require('express-validator');

// Validation for user registration
exports.registerValidation = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

// Validation for user login
exports.loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
];

// Validation for task creation
exports.taskValidation = [
  body('title', 'Title is required').not().isEmpty(),
  body('description', 'Description must be between 10 and 500 characters')
    .optional()
    .isLength({ min: 10, max: 500 }),
  body('dueDate', 'Invalid date format').isISO8601(),
  body('priority', 'Invalid priority').isIn(['low', 'medium', 'high', 'urgent'])
];

// Middleware to check validation results
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array().map(err => ({
        msg: err.msg,
        param: err.param,
        location: err.location
      })) 
    });
  }
  
  next();
};