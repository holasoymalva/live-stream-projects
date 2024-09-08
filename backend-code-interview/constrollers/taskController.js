const Task = require('../models/taskModel');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        const task = new Task({ title, description, dueDate, status });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(red.params.id);
        if(!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Update task by ID
exports.updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        const task = await Task.findById(
            red.params.id,
            { title, description, dueDate, status },
            { new: true , runValidators: true }
        );
        if(!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Update task by ID
exports.updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        const task = await Task.findById(
            red.params.id,
            { title, description, dueDate, status },
            { new: true , runValidators: true }
        );
        if(!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Delete task by ID
exports.deleteTasK = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}