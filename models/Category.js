const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    color: {
        type: String
    }
})

module.exports = mongoose.model('Category', CategorySchema);