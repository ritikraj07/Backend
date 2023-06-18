let { Schema, model } = require('mongoose')

let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: String,
    number: Number,
    dob: String,
    start_date: String,
    end_date: String,
    gender: String,
    height: String,
    weight: String,
    amount: Number,
    profession: String,
    health: String,
    payment_mod: String,
    password: {
        type: String,
        required: true,
    },
    attendence: [{
        date: String
        , present: Boolean
    }],
    admin_id: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

let User = model('User', UserSchema)

module.exports = User;