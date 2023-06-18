const User = require("../Schema/user.model");

async function Register_User(user) {
    return await User.create(user)
}
async function Get_User(id) {
    let user = await User.findById(id)
    if (!user) {
        throw Error("No user found")
    }
    return user;
}


async function Get_User_with_Admin_Id(id) {
    let user = await User.find({ admin_id: id })
    return user;
}
async function Get_AttendanceByDate(user_id, admin_id, date, value) {
    let user = await User.findOne({ $and: [{ _id: user_id }, { admin_id: admin_id }] })
    user = user.toJSON();
    let attendence_array = user.attendence;
    let check = true;
    attendence_array.map((d) => {
        if (d.date === date) {
            return d;
        }
    })
    if (check) {
        attendence_array = [...attendence_array, { date: date, present: value }]
    }
}


async function Make_Attendance(user_id, date, value) {
    let user = await User.findOne({_id: user_id })
    user = user.toJSON();

    let attendence_array = user.attendence;
    let check = true;
    attendence_array.map((d) => {
        if (d.date === date) {
            d.present = value;
            check = false;
        }
    })
    if (check) {
        attendence_array = [...attendence_array,{date:date, present: value} ]
    }
    user = { ...user, attendence: attendence_array }
    await User.findByIdAndUpdate({ _id: user._id }, user);

    return {
        date: date,
        present: value
    }


    
}

async function Login(email, password) {
    let user = await User.findOne({ email: email })
    if (!user) {
        throw Error("You have no account")
    }
    console.log(password, user.password)
    if (user.password !== password) {
        throw Error("You have entered wrong password")
    }
    return user;
}



module.exports = {Register_User, Get_User, Get_User_with_Admin_Id, Login, Make_Attendance}


