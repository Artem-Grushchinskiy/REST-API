const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const validateContact = require("./validateContact");

router.get("/", listContacts);
router.get("/:id", getContactById);
router.post("/", validateContact, addContact);
router.put("/:id", validateContact, updateContact);
router.delete("/:id", removeContact);

module.exports = router;
