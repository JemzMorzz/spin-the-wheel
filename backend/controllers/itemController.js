const Item = require("../models/itemModel");

const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items" });
    }
};

const getItemsById = async (req, res) => {
    try {
        const items = await Item.find({ wheelId: req.params.id });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items" });
    }
};

const createItem = async (req, res) => {
    e.preventDefault();
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports = { getItems, createItem, getItemsById };
