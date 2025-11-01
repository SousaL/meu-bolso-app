const request = require("supertest");
const httpStatus = require("http-status");
const faker = require("faker");

const setupTestDB = require("../utils/setupTestDB");
const { userOne, userTwo, admin, insertUsers } = require("../fixtures/user.fixture");
const { userOneAccessToken, adminAccessToken } = require("../fixtures/token.fixture");

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

    test("Deve retornar 201 com query padrao usando admin", async () => {
        await insertUsers([userOne, userTwo, admin])
        var res = await request(app)
            .get("/users")
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK);


        expect(res.body).toEqual({
            results: expect.any(Array),
            page: 1,
            limit: 10,
            totalPages: 1,
            totalResults: 3
        })

        expect(res.body.results).toHaveLength(3);
    });


    test("Deve limitar o array se um limit for informado", async () => {
        await insertUsers([userOne, userTwo, admin])
        var res = await request(app)
            .get("/users")
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .query({limit: 1})
            .expect(httpStatus.OK);

        expect(res.body).toEqual({
            results: expect.any(Array),
            page: 1,
            limit: 1,
            totalPages: 3,
            totalResults: 3
        })

        expect(res.body.results).toHaveLength(1);
    });

    test("Deve retornar 403 com usuario normal", async () => {
        await insertUsers([userOne, userTwo, admin])

        var res = await request(app)
            .get("/users")
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .expect(httpStatus.FORBIDDEN);
    });


    test("Deve retornar 403 se nao tiver token", async () => {
        await insertUsers([userOne, userTwo, admin])

        var res = await request(app)
            .get("/users")
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .expect(httpStatus.FORBIDDEN);
    });

  });

  describe("PUT /users/:id", () => { 
    test('Deve retornar 200 se foi possivel atualizar o usuario', async () => {
      await insertUsers([userOne, admin]);

      const updateBody = {
        name : faker.name.findName()
      };

      const res = await request(app)
        .put(`/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);


      expect(res.body).not.toHaveProperty('password');

      expect(res.body).toEqual({
        id: userOne._id.toHexString(),
        name: updateBody.name,
        email: userOne.email,
        role: 'user',
        accounts: []
      })
    })


    test('Deve retornar 401 se o token nao foi informado', async () => {
      await insertUsers([userOne, admin]);

      const updateBody = {
        name : faker.name.findName()
      };

      const res = await request(app)
        .put(`/users/${userOne._id}`)
        .send(updateBody)
        .expect(httpStatus.UNAUTHORIZED);
    })


    test('Deve retornar 404 se o usuario informado nao existe', async () => {
      await insertUsers([admin]);

      const updateBody = {
        name : faker.name.findName()
      };

      const res = await request(app)
        .put(`/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.NOT_FOUND);
    })

  });


  describe("DELETE /users/:id", () => {
    test('Deve retornar 204 se estiver ok', async () => {
      await insertUsers([userOne, admin]);

      var res = await request(app)
        .delete(`/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NO_CONTENT);
    })

    test('Deve retornar 401 se o token estiver faltando', async () => {
      await insertUsers([userOne, admin]);

      var res = await request(app)
        .delete(`/users/${userOne._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    })

    test('Deve retornar 404 se o usuario nao existir', async () => {
      await insertUsers([admin]);

      var res = await request(app)
        .delete(`/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    })

  });

});
