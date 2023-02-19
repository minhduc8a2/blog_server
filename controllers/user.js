const User = require("../models/User");
const mongoose = require("mongoose");
const CustomErrors = require("../errors/customErrors");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.status(200).json({ msg: true, data: users });
};
const getUserByEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({ msg: false, data: null });
  }
  const user = await User.findOne({ email, password });

  if (user) res.status(200).json({ msg: true, data: user });
  else res.status(404).json({ msg: false, data: null });
};

const login = async (req, res) => {
  const { email, password, frontEndToken } = req.body;
  if (frontEndToken) {
    const decoded = jwt.verify(frontEndToken, process.env.SECRET_KEY);
    let email = decoded.email;
    let password = decoded.password;
    const user = await User.findOne({ email, password });
    if (user)
      res.status(200).json({
        msg: true,
        frontEndToken,
        data: { name: user.name, email: user.email, avatar: user.avatar },
      });
    else res.status(404).json({ msg: false, data: null });
  } else {
    if (!email || !password) {
      res.status(404).json({ msg: false, data: null });
    }
    const token = jwt.sign({ email, password }, process.env.SECRET_KEY);

    console.log(token);

    const user = await User.findOne({ email, password });

    if (user)
      res.status(200).json({
        msg: true,
        frontEndToken: token,
        data: { name: user.name, email: user.email, avatar: user.avatar },
      });
    else res.status(404).json({ msg: false, data: null });
  }
};
const signUp = async (req, res) => {
  const { email, password, name, avatar } = req.body;

  if (!email || !password || !name) {
    res.status(404).json({ msg: false, data: null });
  }
  const token = jwt.sign({ email, password }, process.env.SECRET_KEY);

  const user = await User.create({ email, password, name, avatar });
  console.log(user);
  if (user)
    res.status(200).json({
      msg: true,
      frontEndToken: token,
      data: { name: user.name, email: user.email, avatar: user.avatar },
    });
  else res.status(404).json({ msg: false, data: null });
};

module.exports = { getUserByEmailAndPassword, login, getUsers, signUp };
