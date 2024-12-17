// import axios from 'axios';

// // Set the base URL for the API
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500/api';

// // Create an axios instance
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor to attach the token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Error attaching token to request:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor to handle errors
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`; // Include token in the headers
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Error attaching token to request:', error);
//     return Promise.reject(error);
//   }
// );

// // Utility function for standardized error handling
// export const handleAPIError = (error) => {
//   if (error.response) {
//     // Error response from the server
//     console.error('API Error Response:', error.response.data);
//     return error.response.data.message || 'An error occurred';
//   } else if (error.request) {
//     // No response received
//     console.error('No response received:', error.request);
//     return 'No response from the server';
//   } else {
//     // Error during request setup
//     console.error('Error setting up the request:', error.message);
//     return 'Error setting up the request';
//   }
// };

// // **Authentication-related API calls**
// export const authAPI = {
//   // Register a new user
//   register: async (userData) => {
//     try {
//       const response = await api.post('/auth/register', userData);
//       console.log('Registration successful:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Login an existing user
//   login: async (credentials) => {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       console.log('Login successful:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Fetch the current user's details
//   getCurrentUser: async () => {
//     try {
//       const response = await api.get('/auth/me');
//       console.log('Current user fetched:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// // **Task-related API calls**
// export const taskAPI = {
//   // Fetch all tasks with optional pagination and filters
//   getTasks: async (page = 1, limit = 10, filters = {}) => {
//     try {
//       const response = await api.get('/tasks', { params: { page, limit, ...filters } });
//       console.log('Fetched tasks:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Fetch a task by ID
//   getTaskById: async (taskId) => {
//     try {
//       const response = await api.get(`/tasks/${taskId}`);
//       console.log('Fetched task:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Create a new task
//   createTask: async (taskData) => {
//     try {
//       const response = await api.post('/tasks', taskData);
//       console.log('Task created:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Update an existing task
//   updateTask: async (taskId, taskData) => {
//     try {
//       const response = await api.put(`/tasks/${taskId}`, taskData);
//       console.log('Task updated:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Delete a task
//   deleteTask: async (taskId) => {
//     try {
//       const response = await api.delete(`/tasks/${taskId}`);
//       console.log('Task deleted:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Update task status
//   updateTaskStatus: async (taskId, status) => {
//     try {
//       const response = await api.patch(`/tasks/${taskId}/status`, { status });
//       console.log('Task status updated:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Move a task to a different priority list
//   moveToPriorityList: async (taskId, priorityList) => {
//     try {
//       const response = await api.patch(`/tasks/${taskId}/priority`, { priorityList });
//       console.log('Task moved to priority list:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// export default api;

















// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Error attaching token to request:', error);
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     console.error('API Error:', error.response || error.message);
//     return Promise.reject(error);
//   }
// );

// export const authAPI = {
//   register: async (userData) => {
//     try {
//       const response = await api.post('/auth/register', userData);
//       return response.data;
//     } catch (error) {
//       console.error('Error during registration:', error);
//       throw error; // Re-throw the error to be handled by the caller
//     }
//   },

//   login: async (credentials) => {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       return response.data;
//     } catch (error) {
//       console.error('Error during login:', error);
//       throw error; // Re-throw the error to be handled by the caller
//     }
//   },
// };

// // ... other API calls

// export default api;

// // import axios from 'axios';

// // // Set up the API URL
// // const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500/api';

// // // Create an axios instance with base configuration
// // const api = axios.create({
// //   baseURL: API_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // export default api;
















import axios from 'axios';

// Set the base URL for the API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Use 'authToken' stored after login
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Include token in the headers
    }
    return config;
  },
  (error) => {
    console.error('Error attaching token to request:', error);
    return Promise.reject(error);
  }
);

// Utility function for standardized error handling
export const handleAPIError = (error) => {
  if (error.response) {
    // Error response from the server
    console.error('API Error Response:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // No response received
    console.error('No response received:', error.request);
    return 'No response from the server';
  } else {
    // Error during request setup
    console.error('Error setting up the request:', error.message);
    return 'Error setting up the request';
  }
};

// **Authentication-related API calls**
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data; // Returning only the data
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data; // Returning only the data
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data; // Returning only the data
    } catch (error) {
      throw handleAPIError(error);
    }
  },
};

// **Task-related API calls**
export const taskAPI = {
  // Fetch all tasks with optional pagination and filters
  getTasks: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await api.get('/tasks', { params: { page, limit, ...filters } });
      return response.data; // Returning only the data
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Fetch a task by ID
  getTaskById: async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      return response.data; // Returning only the data
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      console.log('Task created:', response.data); // Log the created task
      return response.data; // Return task data to be used in frontend
    } catch (error) {
      console.error('Error creating task:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  },

  // Update an existing task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return response.data; // Returning only the data
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data; // Returning only the data
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Update task status
  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/status`, { status });
      return response.data; // Returning only the data
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Move a task to a different priority list
  moveToPriorityList: async (taskId, priorityList) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/priority`, { priorityList });
      return response.data; // Returning only the data
    } catch (error) {
      throw handleAPIError(error);
    }
  },
};

export default api;