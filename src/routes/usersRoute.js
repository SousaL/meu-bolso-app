const express = require("express");
const router = express.Router();
const { createUser, allUsers, getById } = require("../controllers/usersController");
const userValidate = require("../middleware/userValidate")

router.get("/", allUsers);
router.get("/:id", getById);
router.post("/", userValidate, createUser); 

module.exports = router