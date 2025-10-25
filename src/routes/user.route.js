const express = require("express");
const router = express.Router();
const { createUser, getUsers, getById, updateUser, deleteUser } = require("../controllers/user.controller");
const userValidate = require("../middleware/userValidate")
const auth = require("../middleware/authMiddleware");

router.get("/", auth('admin'), getUsers); // Admin
router.get("/:id", auth('admin'), getById);  // Admin 
router.put("/:id", auth('admin'), userValidate, updateUser); // Admin
router.delete("/:id", auth('admin'), deleteUser); // Admin

module.exports = router