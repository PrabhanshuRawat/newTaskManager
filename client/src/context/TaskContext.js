// // import React, { createContext, useContext, useState } from 'react';
// // import api from '../utils/api';

// // // Create the Task Context
// // const TaskContext = createContext();

// // // Custom hook to use the Task Context
// // export const useTask = () => useContext(TaskContext);

// // // Task Provider component
// // export const TaskProvider = ({ children }) => {
// //   const [tasks, setTasks] = useState([]);

// //   // Create a new task
// //   const createTask = async (taskData) => {
// //     try {
// //       const response = await api.post('/tasks', taskData);
// //       setTasks([...tasks, response.data.task]);
// //     } catch (error) {
// //       console.error('Create task error:', error);
// //     }
// //   };

// //   // Fetch all tasks
// //   const getTasks = async () => {
// //     try {
// //       const response = await api.get('/tasks');
// //       setTasks(response.data.tasks);
// //     } catch (error) {
// //       console.error('Get tasks error:', error);
// //     }
// //   };

// //   // Update a task
// //   const updateTask = async (taskId, updatedTask) => {
// //     try {
// //       await api.put(`/tasks/${taskId}`, updatedTask);
// //       setTasks(tasks.map((task) => (task._id === taskId ? { ...task, ...updatedTask } : task)));
// //     } catch (error) {
// //       console.error('Update task error:', error);
// //     }
// //   };

// //   // Delete a task
// //   const deleteTask = async (taskId) => {
// //     try {
// //       await api.delete(`/tasks/${taskId}`);
// //       setTasks(tasks.filter((task) => task._id !== taskId));
// //     } catch (error) {
// //       console.error('Delete task error:', error);
// //     }
// //   };

// //   // Provide the Task Context to the children components
// //   return (
// //     <TaskContext.Provider value={{ tasks, createTask, getTasks, updateTask, deleteTask }}>
// //       {children}
// //     </TaskContext.Provider>
// //   );
// // };
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
import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  tasks: [],
  loading: true,
  error: null,
  selectedTask: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0
  }
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
  SET_PAGINATION: 'SET_PAGINATION'
};

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        )
      };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ACTIONS.SET_SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.payload
      };
    case ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload
      };
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
  const setTasks = (tasks) => {
    dispatch({ type: ACTIONS.SET_TASKS, payload: tasks });
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

  return (
    <TaskContext.Provider
      value={{
        ...state,
        setTasks,
        addTask,
        updateTask,
        deleteTask,
        setLoading,
        setError,
        setSelectedTask,
        setPagination
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
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

// Export TaskContext explicitly
export { TaskContext };