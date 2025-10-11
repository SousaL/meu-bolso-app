const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, private: true},
    role: { type: String, default: 'user' },
    accounts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
})

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

module.exports = mongoose.model('User', userSchema);