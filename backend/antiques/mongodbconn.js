const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    title: String,
    content: String
});

const Item = mongoose.model("Item", itemSchema);

module.exports = async (req, res) => {
    const {
        db
    } = process.env;
    await mongoose.connect(db, {
        useNewUrlParser: true
    });
    const assorted = Math.floor(Math.random() * 100);
    const currItem = new Item({
        title: `firstTitle${assorted}`,
        content: `firstContent${assorted}`
    });
    const result = await currItem.save();
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(result));
}