import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Task Management System</h1>
      {!isAuthenticated ? (
        <div>
          <p>Please log in or register to manage your tasks.</p>
          <Link to="/login" style={{ margin: '10px', color: 'blue' }}>Login</Link>
          <Link to="/register" style={{ margin: '10px', color: 'green' }}>Register</Link>
        </div>
      ) : (
        <div>
          <p>Proceed to your tasks.</p>
          <Link to="/tasks" style={{ color: 'blue' }}>Go to Tasks</Link>
        </div>
      )}
    </div>
  );
};

export default LandingPage;