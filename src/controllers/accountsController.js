const Account = require("../models/account");
const User = require("../models/users");

async function createAccount(req, res) {
  const { name, balance, type } = req.body;
  const user = req.user

  const account = new Account({name, balance, type, user })
  const newAccount = await account.save();

  // const userModel = await User.findById(account.user._id)
  user.accounts.push(account._id);
  user.save()

  res.status(201).json(account);
}

async function allAccounts(req, res) {
  const user = req.user;

  const accounts = await Account.find({user: user}).populate('user');
  res.json(accounts);
}

async function getById(req, res) {
  try {
    const account = await Account.findById(req.params.id).populate('user');
    if (!account) {
      return res.status(404).json({ erro: "Usuario nao encontrado" });
    }
    res.json(account);
  } catch (err) {
    res.status(400).json({ erro: "ID invalido" });
  }
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
  await Account.findByIdAndDelete(req.params.id);
  res.status(204).send()
}

module.exports = {
  createAccount,
  allAccounts,
  getById,
  updateAccount,
  deleteAccount
};
