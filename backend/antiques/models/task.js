const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: {
        type: String
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model("Task", taskSchema);