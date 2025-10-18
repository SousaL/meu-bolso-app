const { User } = require('../models');

/**
 * Create user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    return User.create(userBody);
}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>} 
 */
const getUserByEmail = async (email) => {
    return User.findOne({ email });
}



/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort
 * @param {number} [options.limit] - Max
 * @param {number} [option.page] - Page
 * @return {Primuse<QueryResult>}
 */

const queryUsers = async(filter, options) =>{
    const users = await User.paginate(filter, options);
    return users;
}

module.exports = {
    createUser,
    getUserByEmail,
    queryUsers
}
