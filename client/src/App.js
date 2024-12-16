// // 
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// // Components
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import TaskManager from './components/Tasks/TaskManager';
// import TaskList from './components/Tasks/TaskList';
// import TaskCreate from './components/Tasks/TaskCreate';
// import TaskDetails from './components/Tasks/TaskDetails';
// import TaskEdit from './components/Tasks/TaskEdit';
// import PrivateRoute from './components/Auth/PrivateRoute';
// import Navbar from './components/Layout/Navbar';
// import Sidebar from './components/Layout/Sidebar';

// function App() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <Sidebar />
//         <div className="main-content">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
            
//             {/* Protected Routes */}
//             <Route 
//               path="/tasks" 
//               element={
//                 <PrivateRoute>
//                   <TaskManager />
//                 </PrivateRoute>
//               } 
//             />
//             <Route 
//               path="/tasks/list" 
//               element={
//                 <PrivateRoute>
//                   <TaskList />
//                 </PrivateRoute>
//               } 
//             />
//             <Route 
//               path="/task/create" 
//               element={
//                 <PrivateRoute>
//                   <TaskCreate />
//                 </PrivateRoute>
//               } 
//             />
//             <Route 
//               path="/task/:id" 
//               element={
//                 <PrivateRoute>
//                   <TaskDetails />
//                 </PrivateRoute>
//               } 
//             />
//             <Route 
//               path="/task/edit/:id" 
//               element={
//                 <PrivateRoute>
//                   <TaskEdit />
//                 </PrivateRoute>
//               } 
//             />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

// Authentication Components
import LandingPage from './components/Layout/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Task Management Components
import Dashboard from './components/Dashboard';
import TaskList from './components/Tasks/TaskList';
import TaskCreate from './components/Tasks/TaskCreate';
import TaskDetails from './components/Tasks/TaskDetails';
import TaskEdit from './components/Tasks/TaskEdit';

// Layout Components
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/tasks" 
                element={
                  <PrivateRoute>
                    <TaskList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/tasks/create" 
                element={
                  <PrivateRoute>
                    <TaskCreate />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/tasks/:id" 
                element={
                  <PrivateRoute>
                    <TaskDetails />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/tasks/edit/:id" 
                element={
                  <PrivateRoute>
                    <TaskEdit />
                  </PrivateRoute>
                } 
              />

              {/* Redirect to dashboard if no match */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;