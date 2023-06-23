const User = require("../Schema/user.model");

async function GetUserById(id){
    let user = await User.findById(id)
    user = user.toJSON()
    delete user.password
    return user;
}

module.exports = {GetUserById}