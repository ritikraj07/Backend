const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    email: String,
    password: String,
    image: String,
    gender: String
}, {
    timestamps: true

})

const User = mongoose.model('User', UserSchema)

module.exports = User;