const express = require("express");
const {
  register,
  login,
  profile,
  refresh,
} = require("../controllers/auth.controller");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  registerValidate,
  loginValidate,
} = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", validate(registerValidate), register);
router.post("/login", validate(loginValidate), login);
router.get("/profile", auth, profile);
router.post("/refresh", refresh);

module.exports = router;
