const express = require("express");
const router = express.Router();
const { createUser, getUsers, getById, updateUser, deleteUser } = require("../controllers/user.controller");
const userValidate = require("../middleware/userValidate")

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getUsers);
router.get("/:id", getById);
router.post("/", userValidate, createUser); 
router.put("/:id",  userValidate, updateUser )
router.delete("/:id", deleteUser)

module.exports = router