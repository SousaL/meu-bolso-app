const { User } = require("../models");

const { userService, tokenService, authService } = require("../services");
const httpStatus = require('http-status');

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = tokenService.generateAuthTokens(user);

  res.status(httpStatus.CREATED).json({ user, tokens });

}
const login = async (req, res) => {
  const { email, password} = req.body;
  const user = await authService.login(email, password);
  const tokens = tokenService.generateAuthTokens(user);

  return res.send({ user, tokens});

}

async function refresh(req, res) {
  const tokens = await authService.refresh(req.body.refreshToken);
  res.send({tokens});
}

async function profile(req, res) {
  res.json({ user: req.user });
}

module.exports = { register, login, profile, refresh };
