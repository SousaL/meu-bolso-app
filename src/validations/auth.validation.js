const Joi = require('joi');

const { password } = require('./custom.validation')

const register = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid('user', 'admin')
})

module.exports = {register}