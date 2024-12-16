import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Task Management System</Link>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            {user && <span>Welcome, {user.name}</span>}
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/task/create">Create Task</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;