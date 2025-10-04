const mongoose = require("mongoose");
const { accountType } = require("./enums");

const accountSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  type: { type: String, enum: Object.values(accountType) },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Account", accountSchema);
