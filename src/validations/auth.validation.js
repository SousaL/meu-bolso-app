const Joi = require("joi");

const { password } = require("./custom.validation");

const registerValidate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    role: Joi.string().valid("user", "admin"),
  }),
};

const loginValidate = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { registerValidate, loginValidate };
