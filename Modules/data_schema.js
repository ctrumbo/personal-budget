const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    value: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
}, { collection: 'data'})

module.exports = mongoose.model('data', dataSchema)