const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const services = require("../services/userAuth");
const { registerModal, schemas } = require("../models/user");
const { userModal } = require("../models/modelContact");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const doubleEmail = await registerModal.findOne({ email });
  if (doubleEmail) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await services.createUser({
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ name: newUser.name });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const doubleEmail = await registerModal.findOne({ email });
  if (!doubleEmail) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const comparePassword = await bcrypt.compare(password, doubleEmail.password);
  if (!comparePassword) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const payload = {
    id: doubleEmail.id,
  };
  const token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "23h",
  });

  await registerModal.findByIdAndUpdate(doubleEmail.id, { token });
  res.json(token);
  return;
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await registerModal.findByIdAndUpdate(_id, { token: " " });
  res.json({
    message: "User logout",
  });
};

const getCurrent = async (req, res) => {
  const { name } = req.user;
  res.json({ name, message: "Token is valid" });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
};
