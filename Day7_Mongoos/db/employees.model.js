const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    email: String,
    dateOfBirth: Date,
    dateOfJoin: Date,
    profileImage: String,
    hobbies: [String],
    gender: String,
    designation: String,
    isMarried: String,
    phone: String,
    email: String,
    password:String
}, {
    timestamps:true
})
const Employee = mongoose.model('Employee', EmployeeSchema)
module.exports = Employee;