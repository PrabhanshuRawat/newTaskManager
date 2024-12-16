// import axios from 'axios';

// // Set up Axios instance with base URL and headers
// const api = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add authorization token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Define API functions
// export const login = (email, password) =>
//   api.post('/auth/login', { email, password });

// export const register = (name, email, password) =>
//   api.post('/auth/register', { name, email, password });

// export const getTasks = () => api.get('/tasks');
// export const getTask = (id) => api.get(`/tasks/${id}`);
// export const createTask = (task) => api.post('/tasks', task);
// export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
// export const deleteTask = (id) => api.delete(`/tasks/${id}`);
import axios from 'axios';

// Base URL for API calls
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api' ,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add auth token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Authentication related API calls
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getCurrentUser: () => api.get('/users/me')
};

// Task related API calls
export const taskAPI = {
  // Fetch all tasks with pagination
  getTasks: (page = 1, limit = 10, filters = {}) => 
    api.get('/tasks', { params: { page, limit, ...filters } }),

  // Get a single task by ID
  getTaskById: (taskId) => api.get(`/tasks/${taskId}`),

  // Create a new task
  createTask: (taskData) => api.post('/tasks', taskData),

  // Update an existing task
  updateTask: (taskId, taskData) => api.put(`/tasks/${taskId}`, taskData),

  // Delete a task
  deleteTask: (taskId) => api.delete(`/tasks/${taskId}`),

  // Update task status
  updateTaskStatus: (taskId, status) => 
    api.patch(`/tasks/${taskId}/status`, { status }),

  // Move task between priority lists
  moveToPriorityList: (taskId, priorityList) => 
    api.patch(`/tasks/${taskId}/priority`, { priorityList })
};

// Error handling utility
export const handleAPIError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
    return 'No response from server';
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
    return 'Error setting up the request';
  }
};

export default api;