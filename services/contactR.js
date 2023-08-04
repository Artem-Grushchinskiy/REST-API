const { contactModel } = require("../models/modelContact");
const helpers = require("../helpers/helpers");
const mongoose = require("mongoose");

const getContacts = async (user_id) => {
  const data = await contactModel
    .find({ user_id }, "-createdAt")
    .populate("user_id", "name");
  return data;
};

const createContact = async (contacts, user_id) => {
  const user = await contactModel.create({ ...contacts, user_id });
  return user;
};

const getContactById = async (id) => {
  const boolID = helpers.isValidID(id);
  if (boolID === false) {
    return;
  }
  const contact = await contactModel.findById(id).exec();
  return contact;
};

const updateContact = async (id, contact) => {
  const boolID = helpers.isValidID(id);
  if (boolID === false) {
    return;
  }
  const result = await contactModel.findByIdAndUpdate(id, contact, {
    new: true,
  });
  return result;
};

const deleteContact = async (id) => {
  const boolID = helpers.isValidID(id);
  if (boolID === false) {
    return;
  }
  const result = await contactModel.findByIdAndDelete(id);
  return result;
};

module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
