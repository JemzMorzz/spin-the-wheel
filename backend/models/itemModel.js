const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: {type: String, required: true},
    wheelId: {type: String, required: true, ref: 'Wheel'}
});

module.exports = mongoose.model("Item", itemSchema);
