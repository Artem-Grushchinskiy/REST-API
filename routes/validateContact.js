const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

function validateContact(contact) {
  return contactSchema.validate(contact);
}

module.exports = validateContact;
