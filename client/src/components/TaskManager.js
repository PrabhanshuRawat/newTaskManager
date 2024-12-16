import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Low');

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  // Handle Task Creation
  const createTask = () => {
    if (!newTask || !deadline) {
      alert('Please fill out all fields!');
      return;
    }
    axios.post('http://localhost:5000/api/tasks', {
      name: newTask,
      deadline,
      priority
    }).then(() => {
      alert('Task created successfully!');
      setNewTask('');
      setDeadline('');
      setPriority('Low');
      window.location.reload();
    }).catch((error) => console.error('Error creating task:', error));
  };

  // Handle Task Deletion
  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
      .then(() => {
        alert('Task deleted successfully!');
        window.location.reload();
      }).catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Task Management System</h1>
      <h2>Create a Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={createTask} style={{ padding: '5px 10px' }}>Add Task</button>

      <h2>Existing Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Start by creating one!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} style={{ marginBottom: '10px' }}>
              <strong>{task.name}</strong> - Deadline: {task.deadline} - Priority: {task.priority}
              <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;