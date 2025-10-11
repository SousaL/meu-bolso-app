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
    queryUsers
}
