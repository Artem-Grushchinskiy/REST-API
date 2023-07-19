const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

router.get("/", listContacts);
router.get("/:id", getContactById);
router.post("/", addContact);
router.put("/:id", updateContact);
router.delete("/:id", removeContact);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
