const userCtrl = {};
const User = require("../models/User");

userCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

userCtrl.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

userCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("User deleted");
};

module.exports = userCtrl;
