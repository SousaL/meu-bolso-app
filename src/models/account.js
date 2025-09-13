const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: String,
    balance: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Account', accountSchema);