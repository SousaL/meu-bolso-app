const express = require("express");
const { register, login, profile, refresh } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile)
router.post("/refresh", refresh);

module.exports = router;