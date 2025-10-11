const { User } = require('../models');

/**
 * Create user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    return User.create(userBody);
}

module.exports = {
    createUser,
}