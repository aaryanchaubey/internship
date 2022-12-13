const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    batch: String
}, { timestamps: true });

const Customer = mongoose.model('customer', schema)

module.exports = Customer;