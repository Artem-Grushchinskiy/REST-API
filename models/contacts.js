const fs = require("fs/promises");
const path = require("path");
const validateContact = require("../routes/api/validateContact");

const contactsPath = path.join(__dirname, "contacts.json");

const generateId = () => {
  const id = Math.random().toString(36).substr(2, 9);
  return id;
};

const errorMessages = {
  missingField: (fieldName) => `missing required ${fieldName} field`,
  notFound: "Not found",
  failedTo: (action) => `Failed to ${action}`,
};

const readContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error(errorMessages.failedTo("read contacts"));
  }
};

const writeContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    throw new Error(errorMessages.failedTo("write contacts"));
  }
};

const listContacts = async (req, res) => {
  try {
    const contacts = await readContacts();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === id.toString());
    if (contact) {
      console.log(contact);
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
    const contacts = await readContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== id.toString()
    );
    await writeContacts(updatedContacts);
    res.status(200).json({ message: "contact deleted" });
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
    const contacts = await readContacts();
    const newContact = {
      id: generateId(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeContacts(contacts);
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
    const contacts = await readContacts();
    const index = contacts.findIndex((contact) => contact.id === id.toString());
    if (index !== -1) {
      contacts[index] = {
        id: id.toString(),
        name,
        email,
        phone,
      };
      await writeContacts(contacts);
      res.status(200).json(contacts[index]);
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
