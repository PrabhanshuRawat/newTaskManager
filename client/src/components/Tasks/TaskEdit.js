import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTaskById } = useTaskContext();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
  });

  // Fetch task details when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(id);
        setFormData({
          title: task.title,
          description: task.description,
          dueDate: new Date(task.dueDate).toISOString().split('T')[0], // Format the date
          priority: task.priority,
          status: task.status,
        });
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [id, getTaskById]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating task with data:', formData);
      const updatedTask = await updateTaskById(id, formData);  // Call updateTaskById with the form data
      console.log('Task updated:', updatedTask);
      navigate('/dashboard'); // Navigate to the dashboard after successful update
    } catch (error) {
      console.error('Task update failed:', error);
    }
  };

  return (
    <div className="task-edit-container">
      <h2>Edit Task</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          name="title"
          value={formData.title}
          onChange={onChange}
          required
        />
        <textarea
          placeholder="Task Description"
          name="description"
          value={formData.description}
          onChange={onChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={onChange}
          required
        />
        <select name="priority" value={formData.priority} onChange={onChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select name="status" value={formData.status} onChange={onChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default TaskEdit;