const userModal = require("../models/modelContact");
const helpers = require("../helpers/helpers");

const getContacts = async () => {
  try {
    const data = await userModal.find({});
    return data;
  } catch (err) {
    throw new Error(helpers.errorMessages.failedTo("read contacts"));
  }
};

const createContact = async (contacts) => {
  try {
    const user = new userModal(contacts);
    return await user.save();
  } catch (err) {
    throw new Error(helpers.errorMessages.failedTo("write contacts"));
  }
};

const getContactById = async (id) => {
  return await userModal.findById(id).exec();
};

const updateContact = async (id, contact) => {
  return userModal.findByIdAndUpdate(id, contact, { new: true });
};

const deleteContact = async (id) => {
  return await userModal.findByIdAndDelete(id);
};

module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
