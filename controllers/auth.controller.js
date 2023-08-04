const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const services = require("../services/userAuth");
const { userModel, schemas } = require("../models/user");
const { contactModel } = require("../models/modelContact");

const register = async (req, res) => {
  const { email, password } = req.body;
  const doubleEmail = await userModel.findOne({ email });
  if (doubleEmail) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await services.createUser({
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    users: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const payload = {
    id: user.id,
  };
  const token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "23h",
  });

  await userModel.findByIdAndUpdate(user.id, { token });
  res.json({
    token: token,
    user: { email: email, subscription: user.subscription },
  });
  return;
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await userModel.findByIdAndUpdate(_id, { token: " " });
  res.status(204).json();
  return;
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
};
