const { userModal } = require("../models/modelContact");
const helpers = require("../helpers/helpers");
const mongoose = require("mongoose");

const getContacts = async () => {
  const data = await userModal.find({});
  return data;
};

const createContact = async (contacts) => {
  const user = await userModal.create(contacts);
  return user;
};

const getContactById = async (id) => {
  helpers.isValidID(id);
  const contact = await userModal.findById(id).exec();
  return contact;
};

const updateContact = async (id, contact) => {
  helpers.isValidID(id);
  const result = await userModal.findByIdAndUpdate(id, contact, { new: true });
  return result;
};

const deleteContact = async (id) => {
  const result = await userModal.findByIdAndDelete(id);
  return result;
};

module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
