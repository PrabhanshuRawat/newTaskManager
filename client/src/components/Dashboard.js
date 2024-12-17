// // import React, { useContext, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { TaskContext } from '../context/TaskContext';
// // import TaskList from './Tasks/TaskList';

// // const Dashboard = () => {
// //   const { getTasks, tasks } = useContext(TaskContext);

// //   useEffect(() => {
// //     getTasks();
// //   }, []);

// //   return (
// //     <div className="dashboard-container">
// //       <div className="dashboard-header">
// //         <h1>My Dashboard</h1>
// //         <Link to="/task/create" className="create-task-btn">
// //           Create New Task
// //         </Link>
// //       </div>
      
// //       <div className="task-summary">
// //         <div className="summary-card">
// //           <h3>Total Tasks</h3>
// //           <p>{tasks.length}</p>
// //         </div>
// //         <div className="summary-card">
// //           <h3>Pending Tasks</h3>
// //           <p>{tasks.filter(task => task.status === 'pending').length}</p>
// //         </div>
// //         <div className="summary-card">
// //           <h3>Completed Tasks</h3>
// //           <p>{tasks.filter(task => task.status === 'completed').length}</p>
// //         </div>
// //       </div>

// //       <TaskList />
// //     </div>
// //   );
// // };

// // export default Dashboard;


import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
import TaskList from '../components/Tasks/TaskList';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;






// import React, { useEffect } from 'react';
// import { useAuth } from '../context/AuthContext'; // Correctly import useAuth
// import Sidebar from '../components/Layout/Sidebar'; // Ensure the path is correct
// import TaskList from '../components/Tasks/TaskList'; // Ensure the path is correct

// const Dashboard = () => {
//   const { authState } = useAuth(); // Access authState from context

//   // Log user data when the component mounts
//   useEffect(() => {
//     if (authState.isAuthenticated) {
//       console.log("User Data:", authState.user); // This will log the user data to the console
//     }
//   }, [authState]); // Runs whenever user data changes

//   if (authState.loading) {
//     return <div>Loading...</div>; // Loading state while fetching user data
//   }

//   if (!authState.isAuthenticated) {
//     return <div>Please log in to access the dashboard.</div>; // Redirect to login if not authenticated
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Ensure Sidebar and TaskList are rendering correctly */}
//       <Sidebar />
//       <div className="flex-1 p-8 bg-gray-100">
//         <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//         <TaskList /> {/* Ensure TaskList is rendering correctly */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;