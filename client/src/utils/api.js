// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500/api';

// const api = axios.create({
//   baseURL: 'http://localhost:5500/api', 
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
//     console.log('API Response:', response);
//     return response;
//   },
//   (error) => {
//     console.error('API Error:', error.response || error.message);
//     return Promise.reject(error);
//   }
// );

// export const authAPI = {
//   register: async (userData) => {
//     try {
//       const response = await api.post('/auth/register', userData); // POST to /auth/register
//       console.log('Registration successful:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error during registration:', error);
//       throw handleAPIError(error);
//     }
//   },

//   // Login an existing user
//   login: async (credentials) => {
//     try {
//       const response = await api.post('/auth/login', credentials); // POST to /auth/login
//       console.log('Login successful:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error during login:', error);
//       throw handleAPIError(error);
//     }
//   },

//   // Get the current logged-in user's profile
//   getCurrentUser: async () => {
//     try {
//       const response = await api.get('/users/me'); // GET to /users/me
//       console.log('Fetched current user:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching current user:', error);
//       throw handleAPIError(error);
//     }
//   },
// };

// // **Task Related API Calls**
// export const taskAPI = {
//   // Fetch all tasks with optional filters
//   getTasks: async (page = 1, limit = 10, filters = {}) => {
//     try {
//       const response = await api.get('/tasks', { params: { page, limit, ...filters } }); // GET to /tasks
//       console.log('Fetched tasks:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       throw handleAPIError(error);
//     }
//   },

//   // Fetch a specific task by ID
//   getTaskById: async (taskId) => {
//     try {
//       const response = await api.get(`/tasks/${taskId}`); // GET to /tasks/:id
//       console.log('Fetched task:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching task:', error);
//       throw handleAPIError(error);
//     }
//   },

//   // Create a new task
//   createTask: async (taskData) => {
//     try {
//       const response = await api.post('/tasks', taskData); // POST to /tasks
//       console.log('Task created:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating task:', error);
//       throw handleAPIError(error);
//     }
//   },

//   // Update an existing task by ID
//   updateTask: async (taskId, taskData) => {
//     try {
//       const response = await api.put(`/tasks/${taskId}`, taskData); // PUT to /tasks/:id
//       console.log('Task updated:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating task:', error);
//       throw handleAPIError(error);
//     }
//   },

//   // Delete a task by ID
//   deleteTask: async (taskId) => {
//     try {
//       const response = await api.delete(`/tasks/${taskId}`); // DELETE to /tasks/:id
//       console.log('Task deleted:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       throw handleAPIError(error);
//     }
//   },

//   // Update task status
//   updateTaskStatus: async (taskId, status) => {
//     try {
//       const response = await api.patch(`/tasks/${taskId}/status`, { status }); // PATCH to /tasks/:id/status
//       console.log('Task status updated:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating task status:', error);
//       throw handleAPIError(error);
//     }
//   },

//   // Move a task to a different priority list
//   moveToPriorityList: async (taskId, priorityList) => {
//     try {
//       const response = await api.patch(`/tasks/${taskId}/priority`, { priorityList }); // PATCH to /tasks/:id/priority
//       console.log('Task moved to priority list:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error moving task to priority list:', error);
//       throw handleAPIError(error);
//     }
//   },
// };

// // **Error Handling Utility**
// export const handleAPIError = (error) => {
//   if (error.response) {
//     // Error response from the server
//     console.error('API Error Response:', error.response.data);
//     return error.response.data.message || 'An error occurred';
//   } else if (error.request) {
//     // Request was made but no response received
//     console.error('No response received:', error.request);
//     return 'No response from the server';
//   } else {
//     // Other errors during request setup
//     console.error('Error during setup:', error.message);
//     return 'Error setting up the request';
//   }
// };

// export default api;
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error attaching token to request:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  },
  // ... other authentication functions
};

// ... other API calls

export default api;