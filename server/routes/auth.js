// // const express = require('express');
// // const router = express.Router();
// // const { loginUser, registerUser } = require('../controllers/authController');

// // router.post('/login', loginUser);  // POST login
// // router.post('/register', registerUser);  // POST register
// // router.post('/logout', authController.logout);

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { 
//   registerUser, 
//   loginUser, 
//   getCurrentUser,
//   updateUserProfile 
// } = require('../controllers/userController');
// const { 
//   registerValidation, 
//   loginValidation, 
//   validateRequest 
// } = require('../middleware/validation');
// const authMiddleware = require('../middleware/auth');

// // @route   POST /api/users/register
// // @desc    Register a user
// // @access  Public
// router.post(
//   '/register', 
//   registerValidation, 
//   validateRequest, 
//   registerUser
// );

// // @route   POST /api/users/login
// // @desc    Authenticate user & get token
// // @access  Public
// router.post(
//   '/login', 
//   loginValidation, 
//   validateRequest, 
//   loginUser
// );

// // @route   GET /api/users/me
// // @desc    Get current user profile
// // @access  Private
// router.get(
//   '/me', 
//   authMiddleware, 
//   getCurrentUser
// );

// // @route   PUT /api/users/profile
// // @desc    Update user profile
// // @access  Private
// router.put(
//   '/profile', 
//   authMiddleware, 
//   updateUserProfile
// );

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  updateUserProfile 
} = require('../controllers/userController');
const { 
  registerValidation, 
  loginValidation, 
  validateRequest 
} = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Register a user
// @access  Public
router.post(
  '/register', registerUser
);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login', 
  loginValidation, 
  validateRequest, 
  loginUser
);

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get(
  '/me', 
  authMiddleware,  // This is where you protect routes with authentication middleware
  getCurrentUser  // Ensure this is the function from the controller
);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile', 
  authMiddleware,  // This is where you protect routes with authentication middleware
  updateUserProfile  // Ensure this is the function from the controller
);

module.exports = router;