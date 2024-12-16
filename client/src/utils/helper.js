// Date formatting utility
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const mergedOptions = { ...defaultOptions, ...options };
  return new Date(dateString).toLocaleDateString(undefined, mergedOptions);
};

// Validate task form inputs
export const validateTaskForm = (taskData) => {
  const errors = {};

  // Title validation
  if (!taskData.title || taskData.title.trim() === '') {
    errors.title = 'Title is required';
  }

  // Description validation (optional, but can have max length)
  if (taskData.description && taskData.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  // Due date validation
  if (!taskData.dueDate) {
    errors.dueDate = 'Due date is required';
  } else {
    const selectedDate = new Date(taskData.dueDate);
    const today = new Date();
    if (selectedDate < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  // Priority validation
  const validPriorities = ['low', 'medium', 'high', 'urgent'];
  if (!taskData.priority || !validPriorities.includes(taskData.priority)) {
    errors.priority = 'Please select a valid priority';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Get color based on task priority
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500';
    case 'high':
      return 'bg-orange-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

// Convert priority to display text
export const formatPriority = (priority) => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

// Generate a unique ID (for temporary use)
export const generateUniqueId = () => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Sort tasks by due date
export const sortTasksByDueDate = (tasks, ascending = true) => {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};