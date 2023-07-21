const mongoose = require("mongoose");
const Joi = require("joi");
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
  { versionKey: false }
);

const userModal = mongoose.model("contact", userContact);

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});
const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = { userModal, contactSchema, favoriteSchema };
