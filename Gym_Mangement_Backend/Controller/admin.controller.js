const Admin = require("../Schema/admin.model");

async function Register_Admin(email, password) {
    let alreadyExits = await Admin.findOne({ email: email })
    if (alreadyExits) {
        throw Error("You have already a account")
    }
    return await Admin.create({
        email: email,
        password: password
    })
}

async function Get_Admin(email, password) {
    let admin = await Admin.findOne({ email: email })
    if (!admin) {
        throw Error("You have no account")
    }
    console.log(password, admin.password)
    if (admin.password !== password) {
        throw Error("You have entered wrong password")
    }
    return admin;
}

module.exports = {Register_Admin, Get_Admin}