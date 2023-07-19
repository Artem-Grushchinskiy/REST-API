const { errorMessages } = require("../helpers/helpers");
const services = require("../services/servicesContact");

const listContacts = async (req, res) => {
  try {
    const contacts = await services.getContacts();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await services.getContactById(id);
    res.status(200).json(contact);
  } catch (err) {
    res
      .status(500)
      .json({ message: errorMessages.failedTo("get contact by id") });
  }
};

const removeContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await services.deleteContact(id);
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: errorMessages.failedTo("remove contact") });
  }
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const newContact = await services.createContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: errorMessages.failedTo("add contact") });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedContact = await services.updateContact(id, req.body);
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: errorMessages.failedTo("update contact") });
  }
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  try {
    if (!favorite) {
      return res
        .status(400)
        .json({ message: errorMessages.failedTo("missing field favorite") });
    }
    const updatedContact = await services.updateContact(contactId, {
      favorite,
    });
    if (updatedContact) res.status(200).json(updatedContact);
    else throw new Error();
  } catch (err) {
    res.status(404).json({ message: errorMessages.failedTo("Not found") });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
