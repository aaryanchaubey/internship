const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    fees_amount: Number,
    fees_month: String
}, { timestamps: true });

const Fees = mongoose.model('fees', schema)

module.exports = Fees;