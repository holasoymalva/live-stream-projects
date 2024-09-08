const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: [true, 'Please provide a due date'],
        validate: {
            validator: function (v) {
                return v > new Date();
            },
            message: 'Due date must be in the future',
        },
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'complete'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Task', TaskSchema);