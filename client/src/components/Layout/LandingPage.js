// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';

// // const LandingPage = () => {
// //   const { isAuthenticated } = useAuth();

// //   return (
// //     <div style={{ textAlign: 'center', padding: '50px' }}>
// //       <h1>Welcome to the Task Management System</h1>
// //       {!isAuthenticated ? (
// //         <div>
// //           <p>Please log in or register to manage your tasks.</p>
// //           <Link to="/login" style={{ margin: '10px', color: 'blue' }}>Login</Link>
// //           <Link to="/register" style={{ margin: '10px', color: 'green' }}>Register</Link>
// //         </div>
// //       ) : (
// //         <div>
// //           <p>Proceed to your tasks.</p>
// //           <Link to="/tasks" style={{ color: 'blue' }}>Go to Tasks</Link>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default LandingPage;
// import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold mb-8">Welcome to Task Management</h1>
//       <div className="flex space-x-4">
//         <Link to="/login" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
//           Login
//         </Link>
//         <Link to="/register" className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="landing-page">
      <h1 className="heading">Task Management System</h1>
      <div className="button-container">
        <button className="login-button" onClick={handleLoginClick}>
          Login
        </button>
        <button className="register-button" onClick={handleRegisterClick}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;