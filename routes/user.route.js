const express = require("express");
const { signin, signup } = require("../controllers/user.controller.js");
const router = express.Router();
//routes
router.post("/signin", signin);
router.post("/signup", signup);
module.exports = router;
