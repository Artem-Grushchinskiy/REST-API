const fs = require("fs/promises");
const path = require("path");
const validateContact = require("../routes/api/validateContact");

const contactsPath = path.join(__dirname, "contacts.json");

const errorMessages = {
  missingField: (fieldName) => `missing required ${fieldName} field`,
  notFound: "Not found",
  failedTo: (action) => `Failed to ${action}`,
};

const listContacts = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: errorMessages.failedTo("read contacts") });
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: errorMessages.notFound });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: errorMessages.failedTo("get contact by id") });
  }
};

const removeContact = async (req, res) => {
  const { id } = req.params;

  try {
    const removedContact = await removeContact(id);
    if (removedContact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: errorMessages.notFound });
    }
  } catch (err) {
    res.status(500).json({ message: errorMessages.failedTo("remove contact") });
  }
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name) {
    res.status(400).json({ message: errorMessages.missingField("name") });
    return;
  }

  if (!email) {
    res.status(400).json({ message: errorMessages.missingField("email") });
    return;
  }

  if (!phone) {
    res.status(400).json({ message: errorMessages.missingField("phone") });
    return;
  }

  try {
    validateContact(req.body);
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: errorMessages.failedTo("add contact") });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: errorMessages.missingFields });
  }

  try {
    const updatedContact = await updateContact(id, { name, email, phone });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: errorMessages.notFound });
    }
  } catch (err) {
    res.status(500).json({ message: errorMessages.failedTo("update contact") });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
