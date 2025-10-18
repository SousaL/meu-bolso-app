const faker = require("faker");
const { User } = require("../../../src/models");

describe("User model", () => {
  let newUser;

  beforeEach(() => {
    newUser = {
      name: faker.name.findName(),
      password: "123456789a",
      email: faker.internet.email(),
    };
  });

  test("Deve remover os espacos em branco do nome", async () => {
    newUser.name = `     ${newUser.name}     `;
    let user = new User(newUser);
    expect(user.name).toBe(newUser.name.trim());
  });

  test("Deve remover os espacos em branco e deixar minusculo o email", async () => {
    newUser.email = `     ${newUser.email}     `;
    let user = new User(newUser);
    expect(user.email).toBe(newUser.email.trim().toLowerCase());
  });

  test("Deve acusar erro caso o email seja invalido", async () => {
    newUser.email = "123";
    let user = new User(newUser);
    expect(user.email).toBe(newUser.email.trim().toLowerCase());
  });

  test("Deve retornar erro se nao contiver o campo nome", async () => {
    delete newUser.name;
    await expect(new User(newUser).validate()).rejects.toThrow();
  });

  test("Deve retornar erro se nao contiver o campo email", async () => {
    delete newUser.email;
    await expect(new User(newUser).validate()).rejects.toThrow();
  });

  test("Deve retornar erro se nao contiver o campo password", async () => {
    delete newUser.password;
    await expect(new User(newUser).validate()).rejects.toThrow();
  });
});
