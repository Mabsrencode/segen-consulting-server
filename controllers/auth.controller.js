const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const { createSecretToken } = require("../utils/createSecretToken.js");
// Register a new user
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({
      username,
      email,
      password,
    });
    const token = createSecretToken(user._id.toString());
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.status(201).json({ message: "Registration successful", user });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const userData = {
      username: user.username,
      email: user.email,
      role: user.role,
      _id: user._id,
    };
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Login successful", token, userData });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
