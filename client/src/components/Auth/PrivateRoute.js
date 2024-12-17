import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  // const { authState } = useAuth();

  // if (!authState.isAuthenticated) {
  //   return <Navigate to="/login" />; // Redirect to login if not authenticated
  // }

  return children;
};

export default PrivateRoute;