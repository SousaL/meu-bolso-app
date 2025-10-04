const express = require("express");
const { register, login, profile, refresh } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const userValidate = require("../middleware/userValidate")
const validate = require("../middleware/validate");
const router = express.Router();
const Joi = require('joi')


const testValidate = {
    body: Joi.object({
        name: Joi.string().min(2).max(50).required,
        email: Joi.string().email().required()
    }),
}

router.post("/fake/:iddddddd", validate(testValidate), (req, res) => {res.json({})});
router.post("/register", userValidate, register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile)
router.post("/refresh", refresh);

module.exports = router;