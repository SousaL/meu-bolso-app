const { userOne, userTwo, admin} = require("./user.fixture");
const { tokenService } = require("../../src/services");

const userOneAccessToken = tokenService.generateAccessToken(userOne);
const userTwoAccessToken = tokenService.generateAccessToken(userOne);
const adminAccessToken = tokenService.generateAccessToken(admin);

module.exports = {
    userOneAccessToken,
    userTwoAccessToken,
    adminAccessToken
}

