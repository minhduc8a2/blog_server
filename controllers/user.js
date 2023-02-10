const User = require("../models/User");
const mongoose = require("mongoose");
const CustomErrors = require("../errors/customErrors");

const getUserByEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({ msg: false, data: null });
  }
  const user = await User.findOne({ email, password });

  if (user) res.status(200).json({ msg: true, data: user });
  else res.status(404).json({ msg: false, data: null });
};

module.exports = { getUserByEmailAndPassword };
