const express = require("express");
const router = express.Router();

// get controller logic
const helloWorld = require("../controllers/message");

router.post("/", helloWorld);

module.exports = router;
