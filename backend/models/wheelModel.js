const mongoose = require("mongoose");

const wheelSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model("Wheel", wheelSchema);
