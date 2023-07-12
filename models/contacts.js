const {
  generateId,
  errorMessages,
  readContacts,
  writeContacts,
  handleContactNotFound,
} = require("../helpers/helpers");
const validateContact = require("../routes/api/validateContact");

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
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      handleContactNotFound(res);
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
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    if (updatedContacts.length === contacts.length) {
      handleContactNotFound(res);
    } else {
      await writeContacts(updatedContacts);
      res.status(200).json({ message: "Contact deleted" });
    }
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
    validateContact(req, res, async () => {
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
    });
  } catch (err) {
    res.status(500).json({ message: errorMessages.failedTo("add contact") });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    validateContact(req, res, async () => {
      const contacts = await readContacts();
      const index = contacts.findIndex((contact) => contact.id === id);
      if (index !== -1) {
        contacts[index] = {
          id,
          name,
          email,
          phone,
        };
        await writeContacts(contacts);
        res.status(200).json(contacts[index]);
      } else {
        handleContactNotFound(res);
      }
    });
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
