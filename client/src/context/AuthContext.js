import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { authAPI } from '../utils/api'; // Use authAPI from api.js

// Initial State
const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
};

// Actions
const AUTH_ACTIONS = {
  LOAD_USER: 'LOAD_USER',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
};

// Reducer Function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOAD_USER:
      return { ...state, isAuthenticated: true, loading: false, user: action.payload };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return { ...state, ...action.payload, isAuthenticated: true, loading: false, error: null };
    case AUTH_ACTIONS.AUTH_ERROR:
    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem('token');
      return { ...state, token: null, isAuthenticated: false, loading: false, user: null, error: null };
    case AUTH_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from backend
  const loadUser = async () => {
    try {
      const user = await authAPI.getCurrentUser();
      dispatch({ type: AUTH_ACTIONS.LOAD_USER, payload: user });
    } catch (error) {
      console.error('Failed to load user:', error);
      dispatch({ type: AUTH_ACTIONS.AUTH_ERROR });
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res });
      loadUser();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMsg });
      throw error;
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      const res = await authAPI.register({ name, email, password });
      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: res });
      loadUser();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMsg });
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Automatically load user if token exists
  useEffect(() => {
    if (state.token) loadUser();
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export {AuthContext};