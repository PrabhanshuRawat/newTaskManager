// // // // const http = require('http');
// // // // const app = require('./app');

// // // // const PORT = process.env.PORT || 5500;

// // // // const server = http.createServer(app);

// // // // server.listen(PORT, () => {
// // // //   console.log(`Server is running on port ${PORT}`);
// // // // });
// // // const app = require('./app');

// // // // Port configuration
// // // const PORT = process.env.PORT || 5000;

// // // // Start server
// // // const server = app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // //   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// // // });

// // // // Graceful shutdown
// // // process.on('SIGTERM', () => {
// // //   console.log('SIGTERM signal received: closing HTTP server');
// // //   server.close(() => {
// // //     console.log('HTTP server closed');
// // //     process.exit(0);
// // //   });
// // // });

// // // // Unhandled Promise Rejection Handler
// // // process.on('unhandledRejection', (reason, promise) => {
// // //   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// // //   server.close(() => process.exit(1));
// // // });
// // const app = require('./app');
// // const mongoose = require('mongoose');

// // // Port configuration
// // const PORT = process.env.PORT || 5000;

// // // Start server
// // const server = app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// //   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// // });

// // // Graceful shutdown
// // process.on('SIGTERM', () => {
// //   console.log('SIGTERM signal received: closing HTTP server');
// //   mongoose.connection.close(() => {
// //     console.log('MongoDB connection closed');
// //     server.close(() => {
// //       console.log('HTTP server closed');
// //       process.exit(0);
// //     });
// //   });
// // });

// // // Unhandled Promise Rejection Handler
// // process.on('unhandledRejection', (reason, promise) => {
// //   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// //   mongoose.connection.close(() => {
// //     console.log('MongoDB connection closed');
// //     server.close(() => process.exit(1));
// //   });
// // });
// import { listen } from './app';
// import { connection } from 'mongoose';

// const PORT = process.env.PORT; // Change the default port to 3000

// listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

// // Start server
// const server = listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM signal received: closing HTTP server');
//   connection.close(() => {
//     console.log('MongoDB connection closed');
//     server.close(() => {
//       console.log('HTTP server closed');
//       process.exit(0);
//     });
//   });
// });

// // Unhandled Promise Rejection Handler
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//   connection.close(() => {
//     console.log('MongoDB connection closed');
//     server.close(() => process.exit(1));
//   });
// });
const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config(); 

const PORT = process.env.PORT || 5500;

// Connect to MongoDB and then start the server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });
  });
});