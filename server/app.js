// // // // const express = require('express');
// // // // const bodyParser = require('body-parser');

// // // // const app = express();

// // // // // Parse JSON and URL-encoded request bodies
// // // // app.use(bodyParser.json());
// // // // app.use(bodyParser.urlencoded({ extended: true }));

// // // // // Define your routes here
// // // // app.get('/', (req, res) => {
// // // //   res.send('Hello, World!');
// // // // });

// // // // app.post('/api/users', (req, res) => {
// // // //   // Handle user creation logic here
// // // //   const { name, email } = req.body;
// // // //   // Save the user to the database or perform other operations
// // // //   res.status(201).json({ message: 'User created successfully', user: { name, email } });
// // // // });

// // // // // Export the Express app
// // // // module.exports = app;
// // // const express = require('express');
// // // const cors = require('cors');
// // // const helmet = require('helmet');
// // // const mongoose = require('mongoose');
// // // const dotenv = require('dotenv');

// // // // Load environment variables
// // // dotenv.config();

// // // // Create Express app
// // // const app = express();

// // // // Middleware
// // // app.use(helmet()); // Secure HTTP headers
// // // app.use(cors()); // Enable CORS
// // // app.use(express.json()); // Parse JSON bodies
// // // app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// // // // Database connection
// // // mongoose.connect(
// // //   process.env.MONGODB_URI || 'mongodb://localhost:27017/task_management_db', 
// // //   {
// // //     useNewUrlParser: true,
// // //     useUnifiedTopology: true
// // //   }
// // // )
// // // .then(() => console.log('MongoDB connected successfully'))
// // // .catch(err => console.error('MongoDB connection error:', err));

// // // // Routes
// // // app.use('/api/users', require('./routes/auth'));
// // // app.use('/api/users', require('./routes/users'));
// // // app.use('/api/tasks', require('./routes/tasks'));

// // // // Global error handler
// // // app.use((err, req, res, next) => {
// // //   console.error(err.stack);
// // //   res.status(500).json({
// // //     message: 'Something went wrong!',
// // //     error: process.env.NODE_ENV === 'production' ? {} : err.stack
// // //   });
// // // });

// // // // 404 handler
// // // app.use((req, res) => {
// // //   res.status(404).json({ message: 'Route not found' });
// // // });

// // // module.exports = app;



// // // const express = require('express');
// // // const cors = require('cors');
// // // const helmet = require('helmet');
// // // const mongoose = require('mongoose');
// // // const dotenv = require('dotenv');
// // // const morgan = require('morgan');

// // // // Load environment variables
// // // dotenv.config();

// // // // Create Express app
// // // const app = express();

// // // // Middleware
// // // app.use(
// // //   helmet({
// // //     contentSecurityPolicy: false,
// // //     crossOriginResourcePolicy: { policy: 'same-origin' },
// // //   })
// // // );
// // // app.use(cors());
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // Logger
// // // if (process.env.NODE_ENV !== 'production') {
// // //   app.use(morgan('dev'));
// // // }

// // // // Database connection
// // // const dbURI =
// // //   process.env.NODE_ENV === 'production'
// // //     ? process.env.MONGODB_URI_PROD
// // //     : process.env.MONGODB_URI_DEV;

// // // mongoose
// // //   .connect(dbURI, {
// // //     useNewUrlParser: true,
// // //     useUnifiedTopology: true,
// // //   })
// // //   .then(() => console.log('MongoDB connected successfully'))
// // //   .catch((err) => console.error('MongoDB connection error:', err));

// // // // Routes
// // // app.use('/api/auth', require('./routes/auth'));
// // // app.use('/api/users', require('./routes/users'));
// // // app.use('/api/tasks', require('./routes/tasks'));

// // // // Global error handler
// // // app.use((err, req, res, next) => {
// // //   console.error(err.stack);
// // //   const statusCode = err.statusCode || 500;
// // //   const message =
// // //     process.env.NODE_ENV === 'production'
// // //       ? 'An unexpected error occurred.'
// // //       : err.message;
// // //   res.status(statusCode).json({
// // //     message,
// // //     stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
// // //   });
// // // });

// // // // 404 handler
// // // app.use((req, res) => {
// // //   res.status(404).json({ message: 'Route not found' });
// // // });

// // // module.exports = app;


// // const express = require('express');
// // const cors = require('cors');
// // const helmet = require('helmet');
// // const mongoose = require('mongoose');
// // const dotenv = require('dotenv');
// // const morgan = require('morgan');

// // const connectDB = require('./config/db');

// // const authRoutes = require('./routes/auth');
// // const userRoutes = require('./routes/users');
// // const taskRoutes = require('./routes/tasks');

// // // Load environment variables
// // dotenv.config();

// // // Create Express app
// // const app = express();

// // // Middleware
// // app.use(helmet());
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Logger (in development)
// // if (process.env.NODE_ENV !== 'production') {
// //   app.use(morgan('dev'));
// // }

// // // Database connection
// // connectDB();

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/users', userRoutes);
// // app.use('/api/tasks', taskRoutes);

// // // Global error handler
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).send('Server Error');
// // });

// // // 404 handler
// // app.use((req, res) => {
// //   res.status(404).json({ message: 'Route Not Found' });
// // });

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`Server started on port ${PORT}`);
// // });
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const morgan = require('morgan');

// const connectDB = require('./config/db');

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const taskRoutes = require('./routes/tasks');

// // Load environment variables
// dotenv.config();

// // Create Express app
// const app = express();

// // Middleware
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Logger (in development)
// if (process.env.NODE_ENV !== 'production') {
//   app.use(morgan('dev'));
// }

// // Database connection
// connectDB();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/tasks', taskRoutes);

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Server Error');
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route Not Found' });
// });

// // Export the app instance
// module.exports = app;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger (for development)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);   // Authentication routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/tasks', taskRoutes); // Task routes

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

module.exports = app;