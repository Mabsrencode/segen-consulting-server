const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/user.controller.js");
router.get("/all-users", getAllUsers);

module.exports = router;
