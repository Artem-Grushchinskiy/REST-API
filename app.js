const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const contactsRouter = require("./contacts");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

app.use("/api/contacts", contactsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
