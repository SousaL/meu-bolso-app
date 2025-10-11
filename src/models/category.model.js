const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    type: { type: String, enum: ['income', 'expense']},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Category', categorySchema);