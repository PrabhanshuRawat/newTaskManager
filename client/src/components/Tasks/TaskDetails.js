import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';

const TaskDetails = () => {
  const { id } = useParams();
  const { getTaskById } = useContext(TaskContext);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const fetchedTask = await getTaskById(id);
      setTask(fetchedTask);
    };
    fetchTask();
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-details-container">
      <h2>{task.title}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <div className="task-details-actions">
        <Link to={`/task/edit/${task._id}`}>Edit Task</Link>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default TaskDetails;
