const User = require("../models/user");

const getAllUsers = async (req, res) => {
  const data = await User.find({});
  res.status(200).send(data);
};

module.exports = { getAllUsers };
