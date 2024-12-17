import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { AuthContext } from '../../context/AuthContext'; // Import the AuthContext

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext); // Access auth state and logout method
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/'); // Redirect to the landing page after logout
  };

  return (
    <nav className="navbar bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="navbar-brand text-xl font-bold">
        <Link to="/" className="hover:underline">
          Task Management System
        </Link>
      </div>
      <div className="navbar-menu flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            {user && (
              <span className="text-sm">
                Welcome, <strong>{user.name}</strong>
              </span>
            )}
            <Link
              to="/dashboard"
              className="hover:underline text-sm bg-blue-600 px-4 py-2 rounded-md"
            >
              Dashboard
            </Link>
            <Link
              to="/tasks/create"
              className="hover:underline text-sm bg-green-600 px-4 py-2 rounded-md"
            >
              Create Task
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 text-sm rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:underline text-sm bg-blue-600 px-4 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:underline text-sm bg-green-600 px-4 py-2 rounded-md"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;