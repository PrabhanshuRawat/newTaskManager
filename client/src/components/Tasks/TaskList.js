// import React, { useContext, useEffect, useState } from 'react';
// import { TaskContext } from '../../context/TaskContext';
// import { Link } from 'react-router-dom';

// const TaskList = () => {
//   const { tasks, getTasks, updateTaskStatus, deleteTask } = useContext(TaskContext);
//   const [page, setPage] = useState(1);
//   const [filter, setFilter] = useState({ priority: '', status: '' });

//   useEffect(() => {
//     getTasks(page, filter);
//   }, [page, filter]);

//   const priorityColors = {
//     low: 'bg-green-100',
//     medium: 'bg-yellow-100',
//     high: 'bg-red-100'
//   };

//   return (
//     <div className="task-list-container">
//       <h2>My Tasks</h2>
//       <div className="filters">
//         <select 
//           value={filter.priority} 
//           onChange={(e) => setFilter({...filter, priority: e.target.value})}
//         >
//           <option value="">All Priorities</option>
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//         <select 
//           value={filter.status} 
//           onChange={(e) => setFilter({...filter, status: e.target.value})}
//         >
//           <option value="">All Statuses</option>
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//           </select>
//       </div>
//       <div className="task-grid">
//         {tasks.map(task => (
//           <div 
//             key={task._id} 
//             className={`task-card ${priorityColors[task.priority]}`}
//           >
//             <h3>{task.title}</h3>
//             <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
//             <p>Priority: {task.priority}</p>
//             <p>Status: {task.status}</p>
//             <div className="task-actions">
//               <Link to={`/task/${task._id}`}>View</Link>
//               <Link to={`/task/edit/${task._id}`}>Edit</Link>
//               <button onClick={() => updateTaskStatus(task._id, task.status === 'completed' ? 'pending' : 'completed')}>
//                 {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
//               </button>
//               <button onClick={() => deleteTask(task._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         <button 
//           disabled={page === 1} 
//           onClick={() => setPage(page - 1)}
//         >
//           Previous
//         </button>
//         <span>Page {page}</span>
//         <button 
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useTaskContext } from '../../context/TaskContext';
import { formatDate, getPriorityColor, formatPriority } from '../../utils/helper';

const TaskList = () => {
  const { tasks, setTasks, loading, error, pagination, setPagination } = useTaskContext();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  const fetchTasks = (page) => {
    setTasks([], true);
    // Fetch tasks from the server with pagination
    // Update the tasks and pagination state
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : (
        <div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-2">
                    <Link to={`/tasks/${task._id}`} className="text-blue-500 hover:underline">
                      {task.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{formatDate(task.dueDate)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-md text-white ${getPriorityColor(task.priority)}`}
                    >
                      {formatPriority(task.priority)}
                    </span>
                  </td>
                  <td className="px-4 py-2 capitalize">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-4 py-2 mx-1 rounded-md ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 transition-colors'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;