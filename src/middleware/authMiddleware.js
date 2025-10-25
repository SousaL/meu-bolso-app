const jwt = require("jsonwebtoken");
const { User } = require("../models");
const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Necessario Autenticacao")
      );
    }

    req.user = user;
    
    if (requiredRights.includes("admin") && user.role != "admin") {
      return reject(new ApiError(httpStatus.FORBIDDEN, "Sem Autorizaca"));
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
