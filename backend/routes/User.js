const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.KEY);
    req.user = verified; // store the decoded token payload in req.user if needed
    next(); // call next middleware
  } catch (err) {
    res.status(400).json({ status: false, message: "Invalid token." });
  }
};

// Route to check if user is logged in
router.get("/loggedin", verifyToken, (req, res) => {
  // If verifyToken middleware passes, user is authenticated
  res.json({ status: true });
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });
  // Check if user already exists
  if (user) {
    return res.json({ message: "user already exist" });
  }
  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "record register" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // Check if user already exists (does not exist)
  if (!user) {
    return res.json({ message: "User is not registered" });
  }

  //compare the password
  const validPassword = await bcrypt.compare(password, user.password);
  //check password is correct/incorrect
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  //store token in user cookie
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 }); //httpOnly-No one can not access using javascript
  return res.json({ status: true, message: "login succesfully" });
});

module.exports = router;
