const { ctrlWrapper, validateBody } = require("../../helpers/helpers");
const { contactSchema, favoriteSchema } = require("../../models/modelContact");
const { authMiddleware } = require("../../services/auth");
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

router.get("/", authMiddleware, ctrlWrapper(listContacts));
router.get("/:id", authMiddleware, ctrlWrapper(getContactById));
router.post(
  "/",
  authMiddleware,
  validateBody(contactSchema),
  ctrlWrapper(addContact)
);
router.put(
  "/:id",
  authMiddleware,
  validateBody(contactSchema),
  ctrlWrapper(updateContact)
);
router.delete("/:id", authMiddleware, ctrlWrapper(removeContact));
router.patch(
  "/:contactId/favorite",
  authMiddleware,
  validateBody(favoriteSchema),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
