const express = require("express");
const router = express.Router();
const { createAccount, allAccounts, getById, updateAccount, deleteAccount } = require("../controllers/account.controller");
const validate = require("../middleware/validate");
const { createAccountValidate } = require("../validations/account.validation");
const auth = require("../middleware/authMiddleware");


router.get("/", auth, allAccounts);
router.get("/:id", getById);
router.post("/", auth, validate(createAccountValidate), createAccount); 
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

module.exports = router