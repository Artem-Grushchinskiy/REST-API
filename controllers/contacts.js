const {
  RequestError,
  errorMessages,
  isValidID,
  validateBody,
} = require("../helpers/helpers");
const services = require("../services/contactR");

const listContacts = async (req, res) => {
  const contacts = await services.getContacts();
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;

  const contact = await services.getContactById(id);
  if (!contact) {
    res.status(404).json({ message: "Not Found" });
    return;
  }
  res.status(200).json(contact);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const contact = await services.getContactById(id);
  if (!contact) {
    res.status(404).json({ message: "Not Found" });
    return;
  }
  await services.deleteContact(id);
  res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  const newContact = await services.createContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await services.updateContact(id, {
    name,
    email,
    phone,
  });
  if (!updatedContact) {
    res.status(404).json({ message: "Not Found" });
    return;
  }
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await services.updateContact(contactId, req.body);
  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
