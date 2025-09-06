let users = [
  { id: 0, name: "Joao", email: "joao@email.com" },
  { id: 1, name: "Maria", email: "maria@email.com" },
  { id: 2, name: "Franscico", email: "franscico@email.com" },
];

function createUser(req, res) {
  const { name, email } = req.body;
  const user = { id: users.length, name: name, email: email };
  users.push(user);
  res.status(201).json(user);
}

function allUsers(req, res){
    res.json(users)
}

function getById(req, res){
    let user = users.find((r) => r.id === parseInt(req.params.id));
    res.json(user);
}


module.exports = {
    createUser,
    allUsers,
    getById,
}