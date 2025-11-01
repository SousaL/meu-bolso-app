const httpStatus = require("http-status");
const { User, Account } = require("../models");
const { userService } = require(".");
const ApiError = require("../utils/ApiError");

/**
 * Create user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createAccount = async (userId, accountBody) => {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw error(new ApiError(httpStatus.NOT_FOUND, "Usuario nao encontrado"));
  }

  Object.assign(accountBody, { user: userId});
  const account = await Account.create(accountBody);

  user.accounts.push(account);
  await user.save();

  return account;
};

/**
 * Get account by Id
 * @param {string} accountId
 * @returns
 */
const getAccountById = async (userId, accountId) => {
    const account = await Account.findById(accountId);

    if(account.user != userId){
        throw error(new ApiError(httpStatus.UNAUTHORIZED, 'Essa conta nao lhe pertence'))
    }

    return account;
}

/**
 * Update account by Id
 * @param {string} userId
 * @param {string} accountId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateAccountById = async (userId, accountId, updateBody) => {
    const user = await userService.getUserById(userId);
    if(!user){
        throw error(new ApiError(httpStatus.NOT_FOUND, 'Usuario nao encontrado'));
    }

    const account = await getAccountById(accountId);
    if(!account){
        throw error(new ApiError(httpStatus.NOT_FOUND, 'Conta nao encontrada'));
    }

    if(account.user != userId){
        throw error(new ApiError(httpStatus.UNAUTHORIZED, 'Essa conta nao lhe pertence'))
    }


    Object.assign(account, updateBody);
    await account.save();
    return account;
}

/**
 * Delete user by Id
 * @param {string} userId
 * @returns
 */
const deleteAccountById = async (userId) => {
    const user = await userService.getUserById(userId);
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'Usuario nao encontrado');
    }

    const account = await getAccountById(accountId);
    if(!account){
        throw error(new ApiError(httpStatus.NOT_FOUND, 'Conta nao encontrada'));
    }

    if(account.user != userId){
        throw error(new ApiError(httpStatus.UNAUTHORIZED, 'Essa conta nao lhe pertence'))
    }

    await account.deleteOne();
    return account;
}

module.exports = {
  createAccount,
  // getUserByEmail,
  getAccountById,
  deleteAccountById,
  // queryUsers,
  updateAccountById
};
