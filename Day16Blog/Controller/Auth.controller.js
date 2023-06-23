const crypt = require('bcryptjs')
const User = require('../Schema/user.model')
const jwt = require('jsonwebtoken')
const config = require('../Config')

function GenerateToken(user) {
    let payload = {
        _id: user._id,
        email: user.email,
    }
    return jwt.sign(payload, config.JWT_SECRET)
}

function VerifyToken(token) {
    return jwt.verify(token, config.JWT_SECRET);
}

async function Register(email, password) {
    let alreadyExist = await User.findOne({ email: email })
    if (alreadyExist) {
        throw Error("User already Exits")
    }
    let user = await User.create({ email: email, password: crypt.hashSync(password) })
    user = user.toJSON()
    delete user.password;
    return user;
}

async function Login(email, password) {
    let user = await User.findOne({ email: email })
    if (user) {
        user = user.toJSON()
        console.log("user form auth.controll ", user, "passoword entered =>", password)
        if (crypt.compareSync(password, user.password)) {
            delete user.password;
            return GenerateToken(user)
        } else {
            throw new Error("Wrong Password");
        }
    } else {
        throw Error(`No user exits with ${email}`)
    }
}

module.exports = { Register, VerifyToken, Login }

