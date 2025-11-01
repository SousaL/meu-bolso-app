const mongoose = require("mongoose");
const { accountType } = require("./enums");
const { toJSON, paginate } = require("./plugins");

const accountSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  type: { type: String, enum: Object.values(accountType) },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

accountSchema.plugin(toJSON);

module.exports = mongoose.model("Account", accountSchema);
