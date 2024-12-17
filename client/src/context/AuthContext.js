import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Initial State
const initialState = {
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  user: null,
};

// Create Context
const AuthContext = createContext();

// Reducer Function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setAuthState = (authState) => {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: authState,
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setAuthState,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export {AuthContext};

















// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import { authAPI } from '../utils/api';

// // Initial State
// const initialState = {
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: false,
//   loading: true,
//   user: null,
//   error: null,
// };

// // Actions
// const AUTH_ACTIONS = {
//   LOAD_USER: 'LOAD_USER',
//   LOGIN_SUCCESS: 'LOGIN_SUCCESS',
//   REGISTER_SUCCESS: 'REGISTER_SUCCESS',
//   AUTH_ERROR: 'AUTH_ERROR',
//   LOGOUT: 'LOGOUT',
//   SET_ERROR: 'SET_ERROR',
// };

// // Reducer Function
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case AUTH_ACTIONS.LOAD_USER:
//       return { ...state, isAuthenticated: true, loading: false, user: action.payload };
//     case AUTH_ACTIONS.LOGIN_SUCCESS:
//     case AUTH_ACTIONS.REGISTER_SUCCESS:
//       localStorage.setItem('token', action.payload.token);
//       return { ...state, ...action.payload, isAuthenticated: true, loading: false, error: null };
//     case AUTH_ACTIONS.AUTH_ERROR:
//     case AUTH_ACTIONS.LOGOUT:
//       localStorage.removeItem('token');
//       return { ...state, token: null, isAuthenticated: false, loading: false, user: null, error: null };
//     case AUTH_ACTIONS.SET_ERROR:
//       return { ...state, error: action.payload, loading: false };
//     default:
//       return state;
//   }
// };

// // Context
// const AuthContext = createContext();

// // Provider Component
// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   // Load user from backend
//   const loadUser = async () => {
//     try {
//       const user = await authAPI.getCurrentUser();
//       dispatch({ type: AUTH_ACTIONS.LOAD_USER, payload: user });
//     } catch (error) {
//       console.error('Failed to load user:', error);
//       dispatch({ type: AUTH_ACTIONS.AUTH_ERROR });
//     }
//   };

//   // Login user
//   const login = async ({ email, password }) => {
//     try {
//       const res = await authAPI.login({ email, password });
//       dispatch({
//         type: AUTH_ACTIONS.LOGIN_SUCCESS,
//         payload: res,
//       });
//       loadUser(); // Fetch user details after login
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Login failed';
//       dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMsg });
//       throw new Error(errorMsg);
//     }
//   };

//   // Register user
//   const register = async ({ name, email, password }) => {
//     try {
//       const res = await authAPI.register({ name, email, password });
//       dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: res });
//       loadUser();
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Registration failed';
//       dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMsg });
//       throw error;
//     }
//   };

//   // Logout user
//   const logout = () => {
//     dispatch({ type: AUTH_ACTIONS.LOGOUT });
//   };

//   // Automatically load user if token exists
//   useEffect(() => {
//     if (state.token) loadUser();
//   }, [state.token]);

//   return (
//     <AuthContext.Provider
//       value={{
//         token: state.token,
//         isAuthenticated: state.isAuthenticated,
//         loading: state.loading,
//         user: state.user,
//         error: state.error,
//         login,
//         register,
//         logout,
//         loadUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to Use AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };

// export { AuthContext };

// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import { authAPI } from '../utils/api';

// // Initial State
// const initialState = {
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: false,
//   loading: true,
//   user: null,
//   error: null,
// };

// // Actions
// const AUTH_ACTIONS = {
//   LOAD_USER: 'LOAD_USER',
//   LOGIN_SUCCESS: 'LOGIN_SUCCESS',
//   REGISTER_SUCCESS: 'REGISTER_SUCCESS',
//   AUTH_ERROR: 'AUTH_ERROR',
//   LOGOUT: 'LOGOUT',
//   SET_ERROR: 'SET_ERROR',
// };

// // Reducer Function
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case AUTH_ACTIONS.LOAD_USER:
//       return { ...state, isAuthenticated: true, loading: false, user: action.payload };
//     case AUTH_ACTIONS.LOGIN_SUCCESS:
//       localStorage.setItem('token', action.payload.token);
//       return { ...state, token: action.payload.token, isAuthenticated: true, loading: false, error: null };
//     case AUTH_ACTIONS.REGISTER_SUCCESS:
//       localStorage.setItem('token', action.payload.token);
//       return { ...state, token: action.payload.token, isAuthenticated: true, loading: false, error: null };
//     case AUTH_ACTIONS.AUTH_ERROR:
//     case AUTH_ACTIONS.LOGOUT:
//       localStorage.removeItem('token');
//       return { ...state, token: null, isAuthenticated: false, loading: false, user: null, error: null };
//     case AUTH_ACTIONS.SET_ERROR:
//       return { ...state, error: action.payload, loading: false };
//     default:
//       return state;
//   }
// };

// // Context
// const AuthContext = createContext();

// // Provider Component
// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   // Load user from backend
//   const loadUser = async () => {
//     try {
//       const user = await authAPI.getCurrentUser();
//       dispatch({ type: AUTH_ACTIONS.LOAD_USER, payload: user });
//     } catch (error) {
//       console.error('Failed to load user:', error);
//       dispatch({ type: AUTH_ACTIONS.AUTH_ERROR });
//     }
//   };

//   // Login user
//   const login = async ({ email, password }) => {
//     try {
//       const res = await authAPI.login({ email, password });
//       dispatch({
//         type: AUTH_ACTIONS.LOGIN_SUCCESS,
//         payload: res,
//       });
//       loadUser(); // Fetch user details after login
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Login failed';
//       dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMsg });
//       throw new Error(errorMsg);
//     }
//   };

//   // Register user
//   const register = async ({ name, email, password }) => {
//     try {
//       const res = await authAPI.register({ name, email, password });
//       dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: res });
//       loadUser();
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Registration failed';
//       dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMsg });
//       throw error;
//     }
//   };

//   // Logout user
//   const logout = () => {
//     dispatch({ type: AUTH_ACTIONS.LOGOUT });
//   };

//   // Automatically load user if token exists
//   useEffect(() => {
//     if (state.token) loadUser();
//   }, [state.token]);

//   return (
//     <AuthContext.Provider
//       value={{
//         token: state.token,
//         isAuthenticated: state.isAuthenticated,
//         loading: state.loading,
//         user: state.user,
//         error: state.error,
//         login,
//         register,
//         logout,
//         loadUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to Use AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };

// export { AuthContext };


// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     token: localStorage.getItem('authToken'), // Get token from localStorage
//     user: null,
//     isAuthenticated: false,
//     loading: true,
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (authState.token) {
//       loadUser();
//     } else {
//       setAuthState({ ...authState, loading: false });
//       navigate('/login'); // Redirect to login if no token is found
//     }
//   }, [authState.token, navigate]);

//   const loadUser = async () => {
//     try {
//       const response = await axios.get('http://localhost:5500/api/auth/me', {
//         headers: {
//           Authorization: `Bearer ${authState.token}`, // Send the token in the Authorization header
//         },
//       });
//       setAuthState({ token: authState.token, user: response.data, isAuthenticated: true, loading: false });
//     } catch (error) {
//       console.error('Error loading user:', error);
//       setAuthState({ ...authState, loading: false });
//       navigate('/login'); // Redirect to login on error
//     }
//   };

//   const login = (token) => {
//     localStorage.setItem('authToken', token); // Save token to localStorage
//     setAuthState({ ...authState, token, isAuthenticated: true });
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken'); // Remove token from localStorage
//     setAuthState({ ...authState, token: null, isAuthenticated: false, user: null });
//     navigate('/login'); // Redirect to login after logout
//   };

//   return (
//     <AuthContext.Provider value={{ authState, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export {AuthContext};














// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import axios from 'axios';

// // Initial State
// const initialState = {
//   token: localStorage.getItem('token') || null, // Check if token exists in localStorage
//   isAuthenticated: false,
//   loading: true,
//   user: null,
//   error: null,
// };

// // Actions
// const AUTH_ACTIONS = {
//   LOAD_USER: 'LOAD_USER',
//   LOGIN_SUCCESS: 'LOGIN_SUCCESS',
//   REGISTER_SUCCESS: 'REGISTER_SUCCESS',
//   AUTH_ERROR: 'AUTH_ERROR',
//   LOGOUT: 'LOGOUT',
//   SET_ERROR: 'SET_ERROR',
// };

// // Reducer Function
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case AUTH_ACTIONS.LOAD_USER:
//       return { ...state, isAuthenticated: true, loading: false, user: action.payload };
//     case AUTH_ACTIONS.LOGIN_SUCCESS:
//     case AUTH_ACTIONS.REGISTER_SUCCESS:
//       localStorage.setItem('token', action.payload.token);  // Save token to localStorage
//       return { ...state, ...action.payload, isAuthenticated: true, loading: false, error: null };
//     case AUTH_ACTIONS.AUTH_ERROR:
//     case AUTH_ACTIONS.LOGOUT:
//       localStorage.removeItem('token'); // Remove token on logout
//       return { ...state, token: null, isAuthenticated: false, loading: false, user: null, error: null };
//     case AUTH_ACTIONS.SET_ERROR:
//       return { ...state, error: action.payload, loading: false };
//     default:
//       return state;
//   }
// };

// // Context
// const AuthContext = createContext();

// // Provider Component
// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   // Load user from backend
//   const loadUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await axios.get('http://localhost:5500/api/auth/me', {
//         headers: {
//           Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//         },
//       });

//       dispatch({ type: AUTH_ACTIONS.LOAD_USER, payload: response.data });
//     } catch (error) {
//       console.error('Failed to load user:', error);
//       dispatch({ type: AUTH_ACTIONS.AUTH_ERROR });
//     }
//   };

//   // Login user
//   const login = async ({ email, password }) => {
//     try {
//       const res = await axios.post('/api/auth/login', { email, password }, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       dispatch({
//         type: AUTH_ACTIONS.LOGIN_SUCCESS,
//         payload: res.data,
//       });

//       loadUser(); // Fetch user details after login
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Login failed';
//       dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMsg });
//       throw new Error(errorMsg);
//     }
//   };

//   // Register user
//   const register = async ({ name, email, password }) => {
//     try {
//       const res = await axios.post('/api/auth/register', { name, email, password }, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       dispatch({
//         type: AUTH_ACTIONS.REGISTER_SUCCESS,
//         payload: res.data,
//       });

//       loadUser(); // Fetch user details after registration
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Registration failed';
//       dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMsg });
//       throw error;
//     }
//   };

//   // Logout user
//   const logout = () => {
//     dispatch({ type: AUTH_ACTIONS.LOGOUT });
//   };

//   // Automatically load user if token exists
//   useEffect(() => {
//     if (state.token) {
//       loadUser();  // If token exists, try to load the user
//     } else {
//       dispatch({ type: AUTH_ACTIONS.AUTH_ERROR });
//     }
//   }, [state.token]);

//   return (
//     <AuthContext.Provider
//       value={{
//         token: state.token,
//         isAuthenticated: state.isAuthenticated,
//         loading: state.loading,
//         user: state.user,
//         error: state.error,
//         login,
//         register,
//         logout,
//         loadUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to Use AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };

// export { AuthContext };