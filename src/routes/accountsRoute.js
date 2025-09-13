const express = require("express");
const router = express.Router();
const { createAccount, allAccounts, getById, updateAccount, deleteAccount } = require("../controllers/accountsController");

router.get("/", allAccounts);
router.get("/:id", getById);
router.post("/", createAccount); 
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

module.exports = router