// import React, { useState } from 'react';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [user] = useState({
//     name: 'User',
//     avatar: '/default-avatar.png'
//   });

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const sidebarLinks = [
//     { 
//       name: 'Dashboard', 
//       path: '#dashboard', 
//       icon: '📊'
//     },
//     { 
//       name: 'Create Task', 
//       path: '#create-task', 
//       icon: '➕'
//     },
//     { 
//       name: 'All Tasks', 
//       path: '#tasks', 
//       icon: '📋'
//     },
//     { 
//       name: 'Priority Lists', 
//       path: '#priority', 
//       icon: '🏷️'
//     }
//   ];

//   const handleLogout = () => {
//     // Placeholder for logout functionality
//     alert('Logout clicked');
//   };

//   return (
//     <div className={`h-screen bg-gray-800 text-white transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
//       <div className="flex items-center justify-between p-4 border-b border-gray-700">
//         {isOpen && (
//           <div className="flex items-center">
//             <img 
//               src={user.avatar} 
//               alt="User Avatar" 
//               className="w-10 h-10 rounded-full mr-2"
//             />
//             <span className="text-sm">{user.name}</span>
//             </div>
//         )}
//         <button 
//           onClick={toggleSidebar} 
//           className="focus:outline-none"
//         >
//           {isOpen ? '◀️' : '▶️'}
//         </button>
//       </div>

//       <nav className="mt-4">
//         {sidebarLinks.map((link) => (
//           <a 
//             key={link.path} 
//             href={link.path} 
//             className="block flex items-center p-4 hover:bg-gray-700 transition duration-200"
//           >
//             <span className="mr-2 text-xl">{link.icon}</span>
//             {isOpen && <span className="text-sm">{link.name}</span>}
//           </a>
//         ))}
//       </nav>

//       <div className="absolute bottom-0 w-full">
//         <button 
//           onClick={handleLogout} 
//           className="w-full p-4 bg-red-600 hover:bg-red-700 transition duration-200 flex items-center justify-center"
//         >
//           {isOpen ? 'Logout' : '🚪'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = AuthContext();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Create Task', path: '/tasks/create', icon: '➕' },
    { name: 'All Tasks', path: '/tasks', icon: '📋' },
    { name: 'Priority Lists', path: '/tasks/priority', icon: '🏷️' },
  ];

  return (
    <div className={`h-screen bg-gray-800 text-white transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && (
          <div className="flex items-center">
            <img src={user?.avatar || '/default-avatar.png'} alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
            <span className="text-sm">{user?.name || 'User'}</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? '◀️' : '▶️'}
        </button>
      </div>

      <nav className="mt-4">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-center p-4 hover:bg-gray-700 transition duration-200"
          >
            <span className="mr-2 text-xl">{link.icon}</span>
            {isOpen && <span className="text-sm">{link.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full">
        <button onClick={logout} className="w-full p-4 bg-red-600 hover:bg-red-700 transition duration-200 flex items-center justify-center">
          {isOpen ? 'Logout' : '🚪'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;