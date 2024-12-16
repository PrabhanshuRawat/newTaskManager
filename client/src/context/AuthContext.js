// import React, { createContext, useReducer, useContext } from 'react';
// import axios from 'axios';

// // Initial state
// const initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: null,
//   loading: true,
//   user: null
// };

// // Create context
// export const AuthContext = createContext(initialState);

// // Reducer
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'USER_LOADED':
//       return {
//         ...state,
//         isAuthenticated: true,
//         loading: false,
//         user: action.payload
//       };
//     case 'LOGIN_SUCCESS':
//     case 'REGISTER_SUCCESS':
//       localStorage.setItem('token', action.payload.token);
//       return {
//         ...state,
//         ...action.payload,
//         isAuthenticated: true,
//         loading: false
//       };
//     case 'LOGIN_FAIL':
//     case 'REGISTER_FAIL':
//     case 'LOGOUT':
//       localStorage.removeItem('token');
//       return {
//         ...state,
//         token: null,
//         isAuthenticated: false,
//         loading: false,
//         user: null
//       };
//     default:
//       return state;
//   }
// };

// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   // Load User
//   const loadUser = async () => {
//     try {
//       const res = await axios.get('/api/auth/user', {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       });

//       dispatch({
//         type: 'USER_LOADED',
//         payload: res.data
//       });
//     } catch (err) {
//       dispatch({ type: 'LOGIN_FAIL' });
//     }
//   };

//   // Login User
//   const login = async (email, password) => {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };

//     try {
//       const res = await axios.post('/api/auth/login', { email, password }, config);

//       dispatch({
//         type: 'LOGIN_SUCCESS',
//         payload: res.data
//       });

//       loadUser();
//     } catch (err) {
//       dispatch({ type: 'LOGIN_FAIL' });
//       throw err;
//     }
//   };

//   // Register User
//   const register = async ({ name, email, password }) => {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };

//     try {
//       const res = await axios.post('/api/auth/register', { name, email, password }, config);

//       dispatch({
//         type: 'REGISTER_SUCCESS',
//         payload: res.data
//       });

//       loadUser();
//     } catch (err) {
//       dispatch({ type: 'REGISTER_FAIL' });
//       throw err;
//     }
//   };

//   // Logout
//   const logout = () => dispatch({ type: 'LOGOUT' });

//   return (
//     <AuthContext.Provider
//       value={{
//         token: state.token,
//         isAuthenticated: state.isAuthenticated,
//         loading: state.loading,
//         user: state.user,
//         login,
//         register,
//         logout,
//         loadUser
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to consume AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return context;
// };

import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

// Create context
const AuthContext = createContext(initialState);

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/user', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });

      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL' });
    }
  };

  // Login User
  const login = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/login', { email, password }, config);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL' });
      throw err;
    }
  };

  // Register User
  const register = async ({ name, email, password }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/register', { name, email, password }, config);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({ type: 'REGISTER_FAIL' });
      throw err;
    }
  };

  // Logout
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        login,
        register,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// Explicitly export AuthContext
export { AuthContext };