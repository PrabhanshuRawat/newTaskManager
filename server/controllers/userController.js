// const User = require('../models/User');
// const { verifyToken } = require('../middleware/auth');
// const { validateUserInput } = require('../middleware/validation');

// const register = [
//   validateUserInput,
//   async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//       const user = await User.create({ name, email, password });
//       const token = user.generateToken();
//       res.status(201).json({ user, token });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   },
// ];

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByCredentials(email, password);
//     const token = user.generateToken();
//     res.json({ user, token });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const me = [
//   verifyToken,
//   async (req, res) => {
//     res.json(req.user);
//   },
// ];

// module.exports = { register, login, me };
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user._id
      }
    };

    jwt.sign(
      payload, 
      process.env.JWT_SECRET || 'your_jwt_secret', 
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ 
          token, 
          user: { 
            id: user._id, 
            name: user.name, 
            email: user.email 
          } 
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user._id
      }
    };

    jwt.sign(
      payload, 
      process.env.JWT_SECRET || 'your_jwt_secret', 
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token, 
          user: { 
            id: user._id, 
            name: user.name, 
            email: user.email 
          } 
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get current user profile
exports.getCurrentUser = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching user profile' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find user and update
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};