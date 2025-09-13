const Account = require("../models/account");
const User = require("../models/users");

async function createAccount(req, res) {
  const { name, balance, user } = req.body;
  const account = new Account({name, balance, user })
  const newAccount = await account.save();

  console.log(account);
  const userModel = await User.findById(account.user._id)
  userModel.accounts.push(account._id);
  await userModel.save()

  res.status(201).json(account);
}

async function allAccounts(req, res) {
  const accounts = await Account.find().populate('user');
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
