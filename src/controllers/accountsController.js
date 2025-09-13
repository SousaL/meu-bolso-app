const Account = require("../models/account");


async function createAccount(req, res) {
  // const { name, email } = req.body;
  // const user = new User({ name, email });
  // await user.save();
  // res.status(201).json(user);
}

async function allAccounts(req, res) {
  // const users = await User.find();
  // res.json(users);
}

async function getById(req, res) {
  // try {
  //   const user = await User.findById(req.params.id);
  //   if (!user) {
  //     return res.status(404).json({ erro: "Usuario nao encontrado" });
  //   }
  //   res.json(user);
  // } catch (err) {
  //   res.status(400).json({ erro: "ID invalido" });
  // }
}

async function updateAccount(req, res) {
  // try {
  //     const user = await User.findByIdAndUpdate(req.params.id, req.body)
  //     const userUpdated = await User.findById(req.params.id)
  //     res.json(userUpdated)
  // } catch (err) {
  //   res.status(400).json({ erro: "ID invalido" });
  // }
}

async function deleteAccount(req, res){
  // await User.findByIdAndDelete(req.params.id);
  // res.status(204).send()
}

module.exports = {
  createAccount,
  allAccounts,
  getById,
  updateAccount,
  deleteAccount
};
