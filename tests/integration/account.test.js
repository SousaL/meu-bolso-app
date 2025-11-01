const request = require("supertest");
const httpStatus = require("http-status");
const faker = require("faker");
const { User} = require("../../src/models");

const setupTestDB = require("../utils/setupTestDB");
const {
  userOne,
  userTwo,
  admin,
  insertUsers,
} = require("../fixtures/user.fixture");
const {
  userOneAccessToken,
  adminAccessToken,
} = require("../fixtures/token.fixture");

const app = require("../../src/app");

setupTestDB();

describe("Account routes", () => {
  describe("POST /accounts", () => {
    test("Deve retornar 200 se foi possivel criar uma conta", async () => {
      await insertUsers([userOne, admin]);

      const createBody = {
        name: "NUBANK",
        balance: 4.99,
        type: "bank",
      };

      const res = await request(app)
        .post("/accounts") 
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(createBody)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        name: createBody.name,
        balance: createBody.balance,
        type: createBody.type,
        user: expect.anything(),
        id: expect.anything(),
      });

      const dbUser = await User.findById(userOne._id);
      expect(dbUser).toBeDefined();
      expect(dbUser.accounts).toHaveLength(1);
    });
  });
});
