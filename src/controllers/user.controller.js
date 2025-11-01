const userService = require("../services/user.service");
const logger = require('../config/logger');
const pick = require('../utils/pick');
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

async function createUser(req, res) {
  const user = userService.createUser(req.body);
  res.status(200).send(user);
}

async function getUsers(req, res) {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'filter', 'page', 'limit'])
  const result = await userService.queryUsers(filter, options);
  res.json(result);
}

async function getUser(req, res) {
  const user = await userService.getUserById(req.params.id);
  if(!user){
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario nao encontrado')
  }
  res.send(user);
}

async function updateUser(req, res) {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.send(user);
}

async function deleteUser(req, res){
  await userService.deleteUserById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
