const Wheel = require("../models/wheelModel");

const getWheels = async (req, res) => {
    try {
        const wheels = await Wheel.find();
        res.json(wheels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createWheel = async (req, res) => {
    try {
        const newWheel = new Wheel(req.body);
        await newWheel.save();
        res.status(201).json(newWheel);
    } catch (error) {
        res.status(500).json({ message: "Error creating wheel" });
    }
};

module.exports = { getWheels, createWheel };