const Task = require("./models/task.js");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
    const {
        db
    } = process.env;
    await mongoose.connect(db, {
        useNewUrlParser: true
    });
    const assorted = Math.floor(Math.random() * 100);
    const currTask = new Task({
        name: `firstTask${assorted}`,
        content: `firstTaskContent${assorted}`
    });
    const result = await currTask.save();
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify({
        date: new Date().toLocaleString(),
        data: result
    }));
};