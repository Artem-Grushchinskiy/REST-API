const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading contacts file:", err);
        reject(new Error("Failed to read contacts"));
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeContacts = (contacts) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Error writing contacts file:", err);
        reject(new Error("Failed to write contacts"));
      } else {
        resolve();
      }
    });
  });
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await readContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getContactById = async (req, res) => {
  try {
    const contacts = await readContacts();
    const contact = contacts.find((c) => c.id === req.params.id);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addNewContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contacts = await readContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);
    await writeContacts(contacts);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contacts = await readContacts();
    const index = contacts.findIndex((c) => c.id === req.params.id);

    if (index !== -1) {
      contacts[index] = { ...contacts[index], name, email, phone };
      await writeContacts(contacts);
      res.json(contacts[index]);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contacts = await readContacts();
    const index = contacts.findIndex((c) => c.id === req.params.id);

    if (index !== -1) {
      const deletedContact = contacts.splice(index, 1)[0];
      await writeContacts(contacts);
      res.json({ message: "Contact deleted", contact: deletedContact });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContact,
  deleteContact,
};
