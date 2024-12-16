// const Task = require('../models/Task');

// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, dueDate, priority } = req.body;
    
//     const newTask = new Task({
//       title,
//       description,
//       dueDate,
//       priority,
//       user: req.user.id
//     });

//     const task = await newTask.save();
//     res.json(task);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// exports.getTasks = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, priority, status } = req.query;
    
//     const query = { user: req.user.id };
    
//     if (priority) query.priority = priority;
//     if (status) query.status = status;

//     const tasks = await Task.find(query)
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     const count = await Task.countDocuments(query);

//     res.json({
//       tasks,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// exports.updateTask = async (req, res) => {
//   try {
//     const { title, description, dueDate, status, priority } = req.body;

//     let task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ msg: 'Task not found' });
//     }

//     // Ensure user owns task
//     if (task.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     task = await Task.findByIdAndUpdate(
//       req.params.id,
//       { $set: { title, description, dueDate, status, priority } },
//       { new: true }
//     );

//     res.json(task);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ msg: 'Task not found' });
//     }

//     // Ensure user owns task
//     if (task.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     await task.remove();
//     res.json({ msg: 'Task removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

const Task = require('../models/Task');

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user.id
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get tasks with pagination
exports.getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, priority, status } = req.query;
    
    const query = { user: req.user.id };
    
    if (priority) query.priority = priority;
    if (status) query.status = status;

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Task.countDocuments(query);

    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, dueDate, status, priority } },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await task.remove();
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Move task to priority list
exports.moveToPriorityList = async (req, res) => {
  try {
    const { priority } = req.body;
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task.priority = priority;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};