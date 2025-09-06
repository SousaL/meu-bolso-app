const express = require("express");
const router = express.Router();

let users = [
  { id: 0, name: "Joao", idade: 30 },
  { id: 1, name: "Maria", idade: 25 },
  { id: 2, name: "Franscico", idade: 20 },
];

router.get("/", (req, res) => {
  console.log(req.query.name)
  if (req.query.name) {
    let usersFiltered = users.filter((r) => r.name.includes(req.query.name))
    res.json(usersFiltered);
  } else {
    res.json(users);
  }
});

router.get("/:id", (req, res) => {
  let user = users.find((r) => r.id === parseInt(req.params.id));
  res.json(user);
});

router.post("/", (req, res) => {
  users.push(req.body);
  res.status(201).send();
});

module.exports = router