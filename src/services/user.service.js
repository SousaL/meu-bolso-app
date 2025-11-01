const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

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
 * Get user by Id
 * @param {string} userId 
 * @returns 
 */
const getUserById = async (userId) => {
    return User.findById(userId);
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort
 * @param {number} [options.limit] - Max
 * @param {number} [option.page] - Page
 * @return {Promise<QueryResult>}
 */

const queryUsers = async(filter, options) =>{
    const users = await User.paginate(filter, options);
    return users;
}

/**
 * Update user by Id
 * @param {string} userId 
 * @param {Object} updateBody 
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'Usuario nao encontrado');
    }

    Object.assign(user, updateBody);
    await user.save();
    return user;
}

/**
 * Delete user by Id
 * @param {string} userId 
 * @returns 
 */
const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'Usuario nao encontrado');
    }
    await user.deleteOne();
    return user;
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    deleteUserById,
    queryUsers,
    updateUserById
}
