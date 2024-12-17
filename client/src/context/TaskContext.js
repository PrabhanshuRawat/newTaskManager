// import React, { createContext, useReducer, useContext } from 'react';

// // Initial state
// const initialState = {
//   tasks: [],
//   loading: true,
//   error: null,
//   selectedTask: null,
//   pagination: {
//     currentPage: 1,
//     totalPages: 1,
//     totalTasks: 0
//   }
// };

// // Action types
// const ACTIONS = {
//   SET_TASKS: 'SET_TASKS',
//   ADD_TASK: 'ADD_TASK',
//   UPDATE_TASK: 'UPDATE_TASK',
//   DELETE_TASK: 'DELETE_TASK',
//   SET_LOADING: 'SET_LOADING',
//   SET_ERROR: 'SET_ERROR',
//   SET_SELECTED_TASK: 'SET_SELECTED_TASK',
//   SET_PAGINATION: 'SET_PAGINATION'
// };

// // Reducer function
// const taskReducer = (state, action) => {
//   switch (action.type) {
//     case ACTIONS.SET_TASKS:
//       return {
//         ...state,
//         tasks: action.payload,
//         loading: false
//       };
//     case ACTIONS.ADD_TASK:
//       return {
//         ...state,
//         tasks: [...state.tasks, action.payload]
//       };
//     case ACTIONS.UPDATE_TASK:
//       return {
//         ...state,
//         tasks: state.tasks.map(task =>
//           task._id === action.payload._id ? action.payload : task
//         )
//       };
//     case ACTIONS.DELETE_TASK:
//       return {
//         ...state,
//         tasks: state.tasks.filter(task => task._id !== action.payload)
//       };
//     case ACTIONS.SET_LOADING:
//       return {
//         ...state,
//         loading: action.payload
//       };
//     case ACTIONS.SET_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//         loading: false
//       };
//     case ACTIONS.SET_SELECTED_TASK:
//       return {
//         ...state,
//         selectedTask: action.payload
//       };
//     case ACTIONS.SET_PAGINATION:
//       return {
//         ...state,
//         pagination: action.payload
//       };
//     default:
//       return state;
//   }
// };

// // Create context
// const TaskContext = createContext();

// // Provider component
// export const TaskProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(taskReducer, initialState);

//   // Action creators
//   const setTasks = (tasks) => {
//     dispatch({ type: ACTIONS.SET_TASKS, payload: tasks });
//   };

//   const addTask = (task) => {
//     dispatch({ type: ACTIONS.ADD_TASK, payload: task });
//   };

//   const updateTask = (task) => {
//     dispatch({ type: ACTIONS.UPDATE_TASK, payload: task });
//   };

//   const deleteTask = (taskId) => {
//     dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
//   };

//   const setLoading = (loading) => {
//     dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
//   };

//   const setError = (error) => {
//     dispatch({ type: ACTIONS.SET_ERROR, payload: error });
//   };

//   const setSelectedTask = (task) => {
//     dispatch({ type: ACTIONS.SET_SELECTED_TASK, payload: task });
//   };

//   const setPagination = (pagination) => {
//     dispatch({ type: ACTIONS.SET_PAGINATION, payload: pagination });
//   };

//   return (
//     <TaskContext.Provider
//       value={{
//         ...state,
//         setTasks,
//         addTask,
//         updateTask,
//         deleteTask,
//         setLoading,
//         setError,
//         setSelectedTask,
//         setPagination
//       }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };

// // Custom hook to use the TaskContext
// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (!context) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };

// // Export TaskContext explicitly
// export { TaskContext };






















// import React, { createContext, useReducer, useContext } from 'react';
// import api from '../utils/api'; // Assuming API is properly set up

// // Initial state
// const initialState = {
//   tasks: [],
//   loading: true,
//   error: null,
//   selectedTask: null,
//   pagination: { currentPage: 1, totalPages: 1, totalTasks: 0 }
// };

// // Action types
// const ACTIONS = {
//   SET_TASKS: 'SET_TASKS',
//   ADD_TASK: 'ADD_TASK',
//   UPDATE_TASK: 'UPDATE_TASK',
//   DELETE_TASK: 'DELETE_TASK',
//   SET_LOADING: 'SET_LOADING',
//   SET_ERROR: 'SET_ERROR',
//   SET_SELECTED_TASK: 'SET_SELECTED_TASK',
//   SET_PAGINATION: 'SET_PAGINATION',
// };

// // Reducer function
// const taskReducer = (state, action) => {
//   switch (action.type) {
//     case ACTIONS.SET_TASKS:
//       return {
//         ...state,
//         tasks: action.payload.tasks,
//         pagination: action.payload.pagination,
//         loading: false
//       };
//     case ACTIONS.ADD_TASK:
//       return { ...state, tasks: [...state.tasks, action.payload] };
//     case ACTIONS.UPDATE_TASK:
//       return {
//         ...state,
//         tasks: state.tasks.map((task) => (task._id === action.payload._id ? action.payload : task)),
//       };
//     case ACTIONS.DELETE_TASK:
//       return { ...state, tasks: state.tasks.filter((task) => task._id !== action.payload) };
//     case ACTIONS.SET_LOADING:
//       return { ...state, loading: action.payload };
//     case ACTIONS.SET_ERROR:
//       return { ...state, error: action.payload, loading: false };
//     case ACTIONS.SET_SELECTED_TASK:
//       return { ...state, selectedTask: action.payload };
//     case ACTIONS.SET_PAGINATION:
//       return { ...state, pagination: action.payload };
//     default:
//       return state;
//   }
// };

// // Create context
// const TaskContext = createContext();

// // Provider component
// export const TaskProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(taskReducer, initialState);

//   // Action creators
//   const setTasks = (tasks) => {
//     dispatch({ type: ACTIONS.SET_TASKS, payload: tasks });
//   };

//   const addTask = (task) => {
//     dispatch({ type: ACTIONS.ADD_TASK, payload: task });
//   };

//   const updateTask = (task) => {
//     dispatch({ type: ACTIONS.UPDATE_TASK, payload: task });
//   };

//   const deleteTask = (taskId) => {
//     dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
//   };

//   const setLoading = (loading) => {
//     dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
//   };

//   const setError = (error) => {
//     dispatch({ type: ACTIONS.SET_ERROR, payload: error });
//   };

//   const setSelectedTask = (task) => {
//     dispatch({ type: ACTIONS.SET_SELECTED_TASK, payload: task });
//   };

//   const setPagination = (pagination) => {
//     dispatch({ type: ACTIONS.SET_PAGINATION, payload: pagination });
//   };

//   // Fetch tasks from the server
//   const fetchTasks = async (page = 1, limit = 10) => {
//     try {
//       setLoading(true);
//       const response = await api.get('/tasks', {
//         params: { page, limit },
//       });

//       setTasks(response.data.tasks || []);  // Ensure we always pass an array
//       setPagination(response.data.pagination);
//     } catch (error) {
//       setError('Failed to fetch tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add a new task to the server
//   const createTask = async (taskData) => {
//     try {
//       // Get token from localStorage
//       const token = localStorage.getItem('authToken');
      
//       if (!token) {
//         throw new Error('No authorization token found');
//       }
  
//       const response = await api.post('/tasks', taskData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,  // Pass token with request header
//         },
//       });
      
//       console.log('Task created:', response.data);  // Log the created task data
//       return response.data;
//     } catch (error) {
//       console.error('Error creating task:', error);  // Log the error
//       throw error;  // Re-throw the error to be handled by the caller
//     }
//   };

//   // Update task on the server
//   const updateTaskStatus = async (taskId, status) => {
//     try {
//       const response = await api.patch(`/tasks/${taskId}/status`, { status });
//       updateTask(response.data); // Update the task in state
//     } catch (error) {
//       setError('Failed to update task status');
//     }
//   };

//   // Delete task
//   const deleteTaskById = async (taskId) => {
//     try {
//       await api.delete(`/tasks/${taskId}`);
//       deleteTask(taskId); // Remove the task from state
//     } catch (error) {
//       setError('Failed to delete task');
//     }
//   };

//   return (
//     <TaskContext.Provider
//       value={{
//         ...state,
//         fetchTasks,
//         createTask,
//         updateTaskStatus,
//         deleteTaskById,
//         setLoading,
//         setError,
//         setSelectedTask,
//         setPagination,
//       }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };

// // Custom hook to use the TaskContext
// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (!context) {
//     throw new Error('useTaskContext must be used within TaskProvider');
//   }
//   return context;
// };

// export { TaskContext };










import React, { createContext, useReducer, useContext } from 'react';
import api from '../utils/api';

const initialState = {
  tasks: [],
  loading: true,
  error: null,
  selectedTask: null,
  pagination: { currentPage: 1, totalPages: 1, totalTasks: 0 }, // Ensure this is initialized correctly
};

// Action types
const ACTIONS = {
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SELECTED_TASK: 'SET_SELECTED_TASK',
  SET_PAGINATION: 'SET_PAGINATION',
};

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        pagination: action.payload.pagination,
        loading: false,
      };
    case ACTIONS.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case ACTIONS.DELETE_TASK:
      return { ...state, tasks: state.tasks.filter((task) => task._id !== action.payload) };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_SELECTED_TASK:
      return { ...state, selectedTask: action.payload };
    case ACTIONS.SET_PAGINATION:
      return { ...state, pagination: action.payload };
    default:
      return state;
  }
};

// Create context
const TaskContext = createContext();

// Provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Action creators
  const setTasks = (tasks, pagination) => {
    dispatch({ type: ACTIONS.SET_TASKS, payload: { tasks, pagination } });
  };

  const addTask = (task) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: task });
  };

  const updateTask = (task) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: task });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  };

  const setSelectedTask = (task) => {
    dispatch({ type: ACTIONS.SET_SELECTED_TASK, payload: task });
  };

  const setPagination = (pagination) => {
    dispatch({ type: ACTIONS.SET_PAGINATION, payload: pagination });
  };

  // Fetch tasks from the server
  const fetchTasks = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await api.get('/tasks', {
        params: { page, limit },
      });
      setTasks(response.data.tasks || [], response.data.pagination);
    } catch (error) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Fetch task by ID
  const getTaskById = async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      return response.data; // Return task data
    } catch (error) {
      throw error;
    }
  };

  // Add a new task to the server
  const createTask = async (taskData) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authorization token found');
      }

      const response = await api.post('/tasks', taskData, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  // Update task by ID
  const updateTaskById = async (taskId, taskData) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authorization token found');
      }
  
      const response = await api.put(`/tasks/${taskId}`, taskData, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      updateTask(response.data);  // Update the task in the state
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  // Delete task
  const deleteTaskById = async (taskId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authorization token found');
      }

      await api.delete(`/tasks/${taskId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      deleteTask(taskId); // Remove the task from state
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        fetchTasks,
        createTask,
        updateTaskById,  // Pass updateTaskById to context
        deleteTaskById,
        setLoading,
        setError,
        setSelectedTask,
        setPagination,
        getTaskById,  // Ensure getTaskById is passed as well
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

export { TaskContext };