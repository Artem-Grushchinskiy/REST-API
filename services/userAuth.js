const { userModel } = require("../models/user");
const helpers = require("../helpers/helpers");
const mongoose = require("mongoose");

const createUser = async (user) => {
  const newUser = await userModel.create(user);
  return newUser;
};
module.exports = {
  createUser,
};
