const contactRep = require("../repositories/contactR");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const getContacts = () => {
  return contactRep.getContacts();
};
const getContactById = (id) => {
  const objectId = new ObjectId(id);
  return contactRep.getContactById(objectId);
};

const createContact = (contact) => {
  return contactRep.createContact(contact);
};
const deleteContact = (id) => {
  const objectId = new ObjectId(id);
  return contactRep.deleteContact(objectId);
};

const updateContact = (id, contact) => {
  const objectId = new ObjectId(id);
  return contactRep.updateContact(objectId, contact);
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
