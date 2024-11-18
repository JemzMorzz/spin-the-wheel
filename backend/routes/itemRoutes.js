const express = require("express");
const { getItems, createItem, getItemsById } = require("../controllers/itemController");

const router = express.Router();

router.get("/", getItems);

router.get("/:id", getItemsById);
router.post("/", createItem);

module.exports = router;
