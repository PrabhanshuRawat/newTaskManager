import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { taskAPI } from '../../utils/api'; // Make sure the import is correct

const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from the URL params
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch task details by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await taskAPI.getTaskById(id); // Call getTaskById here
        setTask(fetchedTask);
      } catch (error) {
        setError('Failed to fetch task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]); // This effect runs when the component mounts or the ID changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {task && (
        <div>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p>{task.dueDate}</p>
          <p>{task.priority}</p>
          {/* Other task details */}
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
