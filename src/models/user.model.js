const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, private: true },
  role: { type: String, default: "user" },
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
});

userSchema.plugin(toJSON);
userSchema.plugin(paginate);


userSchema.methods.isPasswordMatch = async function(password) {
  const user = this;
  return bcrypt.compare(password, user.password);
}

module.exports = mongoose.model("User", userSchema);
