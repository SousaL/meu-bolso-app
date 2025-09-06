const express = require("express");
const app = express();

app.use(express.json());

//GET
//POST
//PUT
//DELETE

let users = [
  { id: 0, name: "Joao", idade: 30 },
  { id: 1, name: "Maria", idade: 25 },
  { id: 2, name: "Franscico", idade: 20 },
];

app.get("/", (req, res) => {
  res.status(500).json({
    success: false,
  });
});

app.get("/users", (req, res) => {
  console.log(req.query.name)
  if (req.query.name) {
    let usersFiltered = users.filter((r) => r.name.includes(req.query.name))
    res.json(usersFiltered);
  } else {
    res.json(users);
  }
});

app.get("/users/:id", (req, res) => {
  let user = users.find((r) => r.id === parseInt(req.params.id));
  res.json(user);
});

app.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201).send();
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
