const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { tokenTypes } = require("../config/tokens");
const config = require("../config/config");

const generateToken = (user, expiresIn, type) => {
  const payload = { sub: user._id, type };
  const signature = config.jwt.secret;
  return jwt.sign(payload, signature, { expiresIn: expiresIn });
};

const generateAccessToken = (user) => {
  const expiresIn = config.jwt.accessExpiration;
  return generateToken(user, expiresIn, tokenTypes.ACCESS);
};

const generateRefreshToken = (user) => {
  const expiresIn = config.jwt.refreshExpiration;
  return generateToken(user, expiresIn, tokenTypes.REFRESH);
};

const generateAuthTokens = (user) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

const verifyToken = async (refreshToken) => {
  return jwt.verify(refreshToken, config.jwt.secret)
    
}

module.exports = {
  generateAccessToken, 
  generateRefreshToken,
  generateAuthTokens,
  verifyToken
};
