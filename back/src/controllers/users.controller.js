const userCtrl = {};

userCtrl.getUsers = (req, res) => res.json({ message: "All users" });

userCtrl.getUser = (req, res) => res.json({ message: "Ste men" });

userCtrl.createUser = (req, res) => res.json({ message: "User created" });

userCtrl.deleteUser = (req, res) => res.json({ message: "User deleted" });

module.exports = userCtrl;
