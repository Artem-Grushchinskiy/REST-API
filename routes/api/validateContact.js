const Joi = require("joi");
const { errorMessages } = require("../../helpers/helpers");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateContact = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: errorMessages.missingField("fields") });
  }

  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: errorMessages.missingField(error.details[0].context.key),
    });
  }

  next();
};

module.exports = validateContact;
