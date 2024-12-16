import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask } = useContext(TaskContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTaskById(id);
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        priority: task.priority,
        status: task.status
      });
    };
    fetchTask();
  }, [id]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await updateTask(id, formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Task update failed', error);
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
        <select
          name="priority"
          value={formData.priority}
          onChange={onChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={onChange}
        >
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