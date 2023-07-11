const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "helpers", "contacts.json");

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

const handleContactNotFound = (res) => {
  res.status(404).json({ message: errorMessages.notFound });
};

module.exports = {
  generateId,
  errorMessages,
  readContacts,
  writeContacts,
  handleContactNotFound,
  contactsPath,
};
