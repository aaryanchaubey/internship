const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    batch_type: String,
    batch_Count: Number
}, { timestamps: true });

const Batch = mongoose.model('batch', schema)

module.exports = Batch;