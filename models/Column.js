const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
    status : {
        type: String,
        required: true,
       
        enum: ["Todo", "In Progress", "Completed"]
    },

    order: {
        type: [String],
        default: []
    }
});

const Column = mongoose.model("Column", ColumnSchema);
module.exports = Column;