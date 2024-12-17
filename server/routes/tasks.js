// const express = require('express');
// const router = express.Router();
// const taskController = require('../controllers/taskController');
// const auth = require('../middleware/auth');

// // Task Routes with authentication middleware
// router.post('/tasks', auth, taskController.createTask);
// router.get('/tasks', auth, taskController.getTasks);
// router.get('/tasks/:id', auth, taskController.getTaskById);
// router.patch('/tasks/:id', auth, taskController.updateTask);
// router.delete('/tasks/:id', auth, taskController.deleteTask);

// // module.exports = router;













// const express = require('express');
// const router = express.Router();
// const { 
//   createTask, 
//   getAllTasks, 
//   getTaskById, 
//   updateTask, 
//   deleteTask,
//   updateTaskStatus,
//   moveToPriorityList
// } = require('../controllers/taskController');
// const { taskValidation, validateRequest } = require('../middleware/validation');
// const authMiddleware = require('../middleware/auth');

// // @route   POST /api/tasks
// // @desc    Create a new task
// // @access  Private
// router.post(
//   '/', 
//   authMiddleware, 
//   taskValidation, 
//   validateRequest, 
//   createTask
// );

// // @route   GET /api/tasks
// // @desc    Get all tasks with pagination
// // @access  Private
// router.get('/', authMiddleware, getAllTasks);

// // @route   GET /api/tasks/:id
// // @desc    Get task by ID
// // @access  Private
// router.get('/:id', authMiddleware, getTaskById);

// // @route   PUT /api/tasks/:id
// // @desc    Update task
// // @access  Private
// router.put(
//   '/:id', 
//   authMiddleware, 
//   taskValidation, 
//   validateRequest, 
//   updateTask
// );

// // @route   DELETE /api/tasks/:id
// // @desc    Delete task
// // @access  Private
// router.delete('/:id', authMiddleware, deleteTask);

// // @route   PATCH /api/tasks/:id/status
// // @desc    Update task status
// // @access  Private
// router.patch('/:id/status', authMiddleware, updateTaskStatus);

// // @route   PATCH /api/tasks/:id/priority
// // @desc    Move task to different priority list
// // @access  Private
// router.patch('/:id/priority', authMiddleware, moveToPriorityList);

// module.exports = router;







const express = require('express');
const router = express.Router();
const { 
  createTask, 
  getAllTasks, 
  getTaskById, 
  updateTask, 
  deleteTask,
  updateTaskStatus,
  moveToPriorityList
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', authMiddleware, createTask);

// @route   GET /api/tasks
// @desc    Get all tasks with pagination
// @access  Private
router.get('/', authMiddleware, getAllTasks);

// @route   GET /api/tasks/:id
// @desc    Get task by ID
// @access  Private
router.get('/:id', authMiddleware, getTaskById);

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', authMiddleware, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', authMiddleware, deleteTask);

// @route   PATCH /api/tasks/:id/status
// @desc    Update task status
// @access  Private
router.patch('/:id/status', authMiddleware, updateTaskStatus);

// @route   PATCH /api/tasks/:id/priority
// @desc    Move task to different priority list
// @access  Private
router.patch('/:id/priority', authMiddleware, moveToPriorityList);

module.exports = router;