import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const TaskCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  const { createTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const { title, description, dueDate, priority } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call createTask to send data to the backend
      await createTask(formData);
      alert('Task created successfully!');
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error('Task creation failed', error);
      alert('Failed to create the task. Please try again.');
    }
  };

  return (
    <div className="task-create-container">
      <h2>Create New Task</h2>
      <form onSubmit={onSubmit} className="task-create-form">
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter task title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            placeholder="Enter task description"
            name="description"
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={priority} onChange={onChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Create Task</button>
      </form>
    </div>
  );
};

export default TaskCreate;