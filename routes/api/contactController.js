const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

function getContacts() {
  const data = fs.readFileSync(contactsPath, "utf-8");
  return JSON.parse(data);
}

function writeContacts(contacts) {
  const data = JSON.stringify(contacts, null, 2);
  fs.writeFileSync(contactsPath, data);
}

module.exports = { getContacts, writeContacts };
