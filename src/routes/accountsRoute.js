const express = require("express");
const router = express.Router();
const { createAccount, allAccounts, getById, updateAccount, deleteAccount } = require("../controllers/accountsController");
const validate = require("../middleware/validate");
const { createAccountValidate } = require("../validations/account.validation");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/", authMiddleware, allAccounts);
router.get("/:id", getById);
router.post("/", authMiddleware, validate(createAccountValidate), createAccount); 
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

module.exports = router