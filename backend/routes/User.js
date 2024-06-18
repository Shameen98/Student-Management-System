const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
let User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  // Check if user already exists
  const user = await User.findOne({ email });
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
  return res.json({ message: "record register" });
});

module.exports = router;
