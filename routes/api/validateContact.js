const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateContact = (contact) => {
  const { error } = contactSchema.validate(contact);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = validateContact;
