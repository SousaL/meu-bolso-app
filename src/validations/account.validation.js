const Joi = require("joi");
const {accountType} = require("../models/enums")

const createAccountValidate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    balance: Joi.number().required().min(0),
    type: Joi.string().required().valid(...Object.values(accountType))
  }),
};


module.exports = { createAccountValidate };
