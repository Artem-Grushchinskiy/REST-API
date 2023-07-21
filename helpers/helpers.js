const mongoose = require("mongoose");
const messages = {
  404: "Not Found",
  400: "Bad Request",
  401: "Unathorized",
  409: "Conflict",
};

const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
const errorMessages = {
  missingField: (fieldName) => `missing required ${fieldName} field`,
  notFound: "Not found",
  failedTo: (action) => `Failed to ${action}`,
};

const isValidID = (id) => {
  return mongoose.isValidObjectId(id);
};
const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(404).json({ message: error.details[0].message });
    }
    next();
  };

  return func;
};

module.exports = {
  RequestError,
  errorMessages,
  isValidID,
  ctrlWrapper,
  validateBody,
};
