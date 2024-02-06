const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'done']
    },
    date: String,
    time: String
},
{
    timestamps: true
})

module.exports = mongoose.model('Work', workSchema);