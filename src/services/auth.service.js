const ApiError = require("../utils/ApiError");
const { tokenService } = require(".");
const httpStatus = require("http-status");
const { userService } = require(".");


/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */

const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email ou Senha incorreto");
  }

  return user;
};

/**
 * 
 * @param {string} refreshToken 
 * @returns 
 */

const refresh = async (refreshToken) => {
  try {
    const refreshRes = await tokenService.verifyToken(refreshToken);
    return tokenService.generateAuthTokens(refreshRes.user);

  } catch (error) {
    throw ApiError(httpStatus.UNAUTHORIZED, "Autenticar!");
  }
};

module.exports = {
  login,
  refresh,
};
