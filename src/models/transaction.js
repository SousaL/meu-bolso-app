const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    type: { type: String, enum: ['income', 'expense']},
    description: String,
    amount: Number,
    date: Date,
})

module.exports = mongoose.model('Account', accountSchema);