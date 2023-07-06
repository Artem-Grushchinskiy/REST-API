const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const contactsRouter = require("./routes/api/contact");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

app.use("/routes/api/contact", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
