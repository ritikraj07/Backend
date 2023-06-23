const config = require("../Config/index.js")
const User = require("../db/user.model.js")
const jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
function GenerateToken(user) {
    let payload = {
        _id: user._id,
        email: user.email,
        name: user.name
    }

   return jwt.sign(payload, config.JWT_SECRET)
}

function VerifyToken(token) {
    const payload = jwt.verify(token, config.JWT_SECRET)
    return payload
}

async function GetUser(id) {
    let user = await User.findById(id);
    user = user.toJSON();
    delete user.password;
    return user
    
}

async function register(name, email, password) {
    let alreadyExist = await User.findOne({
        email: email
    })
    if (alreadyExist) {
        throw Error("User already Exits")
    }
    let user = await User.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password)
    })
    
    user = user.toJSON();
    delete user.password;
    return user;
}

async function login(email, password) {
    let user = await User.findOne({ email: email })

    if (user) {
        user = user.toJSON();

        if (bcrypt.compareSync(password, user.password)) {
            delete user.password
            return {
                token: GenerateToken(user)
            }
        } else {
            throw new Error("Wrong Password")
        }
    } else {
        throw new Error(`No user found with this ${email} `)
    }

}
async function signInWithGithub({ name, login, avatar_url, email }) {
    console.log(name, login, avatar_url, email);
    let user = await User.findOne({
        signInMethod: 'github',
        githubUserName: login
    })
    
    if (!user) {
       user = await User.create({
            signInMethod: 'github',
            githubUserName: login,
            name: name,
            image: avatar_url,
            email,

        })
    }
    user = user.toJSON()
    delete user.password
    
    return {
        token: GenerateToken(user),
        user
    }

 }

module.exports = {register, login, VerifyToken, GetUser, signInWithGithub }