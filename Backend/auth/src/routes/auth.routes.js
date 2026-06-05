const express = require("express");
const router = express.Router();
const {
  register, login, logout, getMe, updateProfile,
} = require("../controllers/auth.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);
router.get("/me", authenticateUser, getMe);
router.put("/profile", authenticateUser, updateProfile);

module.exports = router;