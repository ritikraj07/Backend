let { Schema, model } = require('mongoose')

let AdminSchema = new Schema({
    email: String,
    password: String
}, {
    timestamps:true
})

let Admin = model('Admin', AdminSchema)

module.exports = Admin;