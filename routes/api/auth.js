const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
} = require("../../controllers/auth.controller");
const { validateBody, ctrlWrapper } = require("../../helpers/helpers");
const { schemas } = require("../../models/user");
const { authMiddleware } = require("../../services/auth");
const { upload } = require("../../services/uploadMiddleware");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(register)
);

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(login));
router.post("/logout", authMiddleware, ctrlWrapper(logout));
router.get("/current", authMiddleware, ctrlWrapper(getCurrent));
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
