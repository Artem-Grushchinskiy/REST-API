const mongoose = require("mongoose");

const userContact = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "contacts" }
);

const userModal = mongoose.model("user", userContact);

module.exports = userModal;
