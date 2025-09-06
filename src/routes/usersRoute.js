const express = require("express");
const router = express.Router();
const { createUser, allUsers, getById } = require("../controllers/usersController");

router.get("/", allUsers);
router.get("/:id", getById);
router.post("/", createUser);

module.exports = router