const express = require("express");
const { createWheel, getWheels } = require("../controllers/wheelController");

const router = express.Router();

router.post("/", createWheel);
router.get("/", getWheels);

module.exports = router;
