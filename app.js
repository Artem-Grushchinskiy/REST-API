const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContact,
  deleteContact,
} = require("./models/contacts");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

app.get("/contacts", getAllContacts);
app.get("/contacts/:id", getContactById);
app.post("/contacts", addNewContact);
app.put("/contacts/:id", updateContact);
app.delete("/contacts/:id", deleteContact);

const port = 3004;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
