const express = require("express");
const router = express.Router();
const { createUser, allUsers, getById, updateUser, deleteUser } = require("../controllers/usersController");
const userValidate = require("../middleware/userValidate")

router.get("/", allUsers);
router.get("/:id", getById);
router.post("/", userValidate, createUser); 
router.put("/:id",  userValidate, updateUser )
router.delete("/:id", deleteUser)

module.exports = router