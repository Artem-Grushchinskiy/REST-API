const generateId = () => {
  const id = Math.random().toString(36).substr(2, 9);
  return id;
};

const errorMessages = {
  missingField: (fieldName) => `missing required ${fieldName} field`,
  notFound: "Not found",
  failedTo: (action) => `Failed to ${action}`,
};

const handleContactNotFound = (res) => {
  res.status(404).json({ message: errorMessages.notFound });
};

module.exports = {
  generateId,
  errorMessages,
  handleContactNotFound,
};
