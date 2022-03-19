const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    deadline: {
        type: Date,
        required: true
    },

    status : {
        type: String,
        required: true,
        enum: ["Todo", "In Progress", "Completed"]
    }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;