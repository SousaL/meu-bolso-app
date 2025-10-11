const { Users }  = require("../models");
const userService = require("../services/user.service");
const logger = require('../config/logger');
const pick = require('../utils/pick');

async function createUser(req, res) {
  const user = userService.createUser(req.body);
  res.status(200).send(user);
}

async function getUsers(req, res) {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'filter', 'page'])
  const result = await userService.queryUsers(filter, options);
  res.json(result);
}

async function getById(req, res) {
  try {
    const user = await User.findById(req.params.id).populate('accounts');
    if (!user) {
      return res.status(404).json({ erro: "Usuario nao encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ erro: "ID invalido" });
  }
}

async function updateUser(req, res) {
  try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body)
      const userUpdated = await User.findById(req.params.id)
      res.json(userUpdated)
  } catch (err) {
    res.status(400).json({ erro: "ID invalido" });
  }
}

async function deleteUser(req, res){
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send()
}

module.exports = {
  createUser,
  getUsers,
  getById,
  updateUser,
  deleteUser
};
