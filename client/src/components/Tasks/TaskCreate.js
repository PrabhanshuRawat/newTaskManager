import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';

const TaskCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  const { createTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const { title, description, dueDate, priority } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await createTask(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Task creation failed', error);
    }
  };

  return (
    <div className="task-create-container">
      <h2>Create New Task</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
        <textarea
          placeholder="Task Description"
          name="description"
          value={description}
          onChange={onChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={onChange}
          required
        />
        <select
          name="priority"
          value={priority}
          onChange={onChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskCreate;
