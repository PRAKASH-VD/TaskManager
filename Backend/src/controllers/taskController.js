import Task from '../models/Task.js';
import { asyncHandler, AppError } from '../middlewares/errorHandler.js';

// @desc    Get all tasks for logged in user
// @route   GET /api/v1/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, search, sortBy = 'createdAt', order = 'desc' } = req.query;

  // Build query
  const query = { user: req.user._id };

  if (status) {
    query.status = status;
  }

  if (priority) {
    query.priority = priority;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  // Execute query with sorting
  const sortOrder = order === 'asc' ? 1 : -1;
  const tasks = await Task.find(query).sort({ [sortBy]: sortOrder });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: {
      tasks
    }
  });
});

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
export const getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  // Make sure user owns the task
  if (task.user.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to access this task', 403));
  }

  res.status(200).json({
    success: true,
    data: {
      task
    }
  });
});

// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: {
      task
    }
  });
});

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  // Make sure user owns the task
  if (task.user.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to update this task', 403));
  }

  const { title, description, status, priority, dueDate } = req.body;

  const fieldsToUpdate = {};
  if (title !== undefined) fieldsToUpdate.title = title;
  if (description !== undefined) fieldsToUpdate.description = description;
  if (status !== undefined) fieldsToUpdate.status = status;
  if (priority !== undefined) fieldsToUpdate.priority = priority;
  if (dueDate !== undefined) fieldsToUpdate.dueDate = dueDate;

  task = await Task.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: {
      task
    }
  });
});

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  // Make sure user owns the task
  if (task.user.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to delete this task', 403));
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: {}
  });
});
