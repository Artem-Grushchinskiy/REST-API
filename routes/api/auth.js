const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
} = require("../../controllers/auth.controller");
const { validateBody, ctrlWrapper } = require("../../helpers/helpers");
const { schemas } = require("../../models/user");
const { authMiddleware } = require("../../services/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(register)
);

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(login));
router.post("/logout", authMiddleware, ctrlWrapper(logout));
router.get("/current", authMiddleware, ctrlWrapper(getCurrent));

module.exports = router;
