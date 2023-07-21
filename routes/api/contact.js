const { ctrlWrapper, validateBody } = require("../../helpers/helpers");
const { contactSchema, favoriteSchema } = require("../../models/modelContact");
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

router.get("/", ctrlWrapper(listContacts));
router.get("/:id", ctrlWrapper(getContactById));
router.post("/", validateBody(contactSchema), ctrlWrapper(addContact));
router.put("/:id", validateBody(contactSchema), ctrlWrapper(updateContact));
router.delete("/:id", ctrlWrapper(removeContact));
router.patch(
  "/:contactId/favorite",
  validateBody(favoriteSchema),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
