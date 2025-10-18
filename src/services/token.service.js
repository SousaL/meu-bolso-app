const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user, expiresIn) => {
  const payload = { id: user._id, email: user.email };
  const signature = process.env.JWT_SIGNATURE;
  return jwt.sign(payload, signature, { expiresIn: expiresIn });
};

const generateAccessToken = (user) => {
  const expiresIn = process.env.JWT_EXPIRES_IN_ACCESS;
  return generateToken(user, expiresIn);
};

const generateRefreshToken = (user) => {
  const expiresIn = process.env.JWT_EXPIRES_IN_REFRESH;
  return generateToken(user, expiresIn);
};

const generateAuthTokens = (user) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

const verifyToken = async (refreshToken) => {
  return jwt.verify(refreshToken, process.env.JWT_SIGNATURE)
    
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthTokens,
  verifyToken
};
