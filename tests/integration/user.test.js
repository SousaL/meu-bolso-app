const request = require("supertest");
const httpStatus = require("http-status");
const faker = require("faker");

const setupTestDB = require("../utils/setupTestDB");
const app = require("../../src/app");

setupTestDB();

describe("User routes", () => {
  describe("GET /users", () => {
    let newUser;

    // beforeEach(() => {
    //   newUser = {
    //     name: faker.name.findName(),
    //     password: "123456789a",
    //     email: faker.internet.email(),
    //   };
    // });

    test("Deve retornar 201 se o usuario foi registrado com sucesso", async () => {
    
    //   var res = await request(app)
    //     .post("/auth/register")
    //     .send(newUser)
    //     .expect(httpStatus.CREATED);

    //     let user = res.body.user;

    //     expect(user.name).toBe(newUser.name);
    //     expect(user).not.toHaveProperty('password');
    //     expect(res.body).toHaveProperty('tokens');
    });

    // test("Deve retornar 400 se a senha tiver menos que 8 caracteres", async () => {
    //   newUser.password = "1234";
    //   var res = await request(app)
    //     .post("/auth/register")
    //     .send(newUser)
    //     .expect(httpStatus.BAD_REQUEST);

    // });
  });

//   describe("POST /login", () => {
//     test("Deve retornar 200", async () => {
//       expect(true).toBe(true);
//     });
//   });
});
