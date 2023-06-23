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
async function Get_AttendanceByDate(user_id, date) {
    
    let user = await User.findById(user_id)
    user = user.toJSON();
    let attendence_array = user.attendence;
    let check = true;
    let DATA = { date: date, present: false }
    attendence_array.map((d) => {
        if (d.date === date) {
            DATA = d
            check = false;
            return d;
        }
    })
    if (check) {
        attendence_array = [...attendence_array, { date: date, present: false }]
    } else {
        return DATA;
    }

    user = { ...user, attendence: attendence_array }
    
    await User.findByIdAndUpdate(user_id ,user)
    return { date: date, present: false };
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
    await User.findByIdAndUpdate(user._id, user);

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

async function All_User_Same_Admin(admin_id, date) {
    let users = await Get_User_with_Admin_Id()
}




module.exports = {Register_User, Get_User, Get_User_with_Admin_Id, Login, Make_Attendance, Get_AttendanceByDate}


