const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const path = require("path");
const gravatar = require("gravatar");
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
  const avatarURL = gravatar.url(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await services.createUser({
    email,
    password: hashedPassword,
    avatar_url: avatarURL,
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
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  Jimp.read(resultUpload)
    .then((lenna) => {
      return lenna.resize(250, 250).write(resultUpload);
    })
    .catch((err) => {
      console.error(err);
    });
  const avatarURL = path.join("avatars", filename);
  await userModel.findByIdAndUpdate(_id, { avatar_url: avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
};
