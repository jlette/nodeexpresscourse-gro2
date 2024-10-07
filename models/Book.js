const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
}, {timestamps: true})

const Book  = mongoose.model('Book', BookSchema);

module.exports = Book