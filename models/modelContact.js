const mongoose = require("mongoose");
const Joi = require("joi");

const isbnRegexp = /^\d{2}-\d{2}-\d{4}$/;

const contactMongoSchema = new mongoose.Schema(
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
    date: {
      type: String,
      match: isbnRegexp,
      unique: true,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const contactModel = mongoose.model("contact", contactMongoSchema);

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});
const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = { contactModel, contactSchema, favoriteSchema };
