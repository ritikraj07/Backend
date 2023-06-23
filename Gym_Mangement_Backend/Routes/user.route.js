let { Router } = require('express');
const User = require('../Schema/user.model');
const { Register_User, Login, Make_Attendance, Get_User, Get_User_with_Admin_Id, Get_AttendanceByDate } = require('../Controller/user.controller');
let UserRoute = Router()

UserRoute.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let user = await Get_User(id);
        res.status(200).send({
            status: true,
            data: user
        })
     } catch (err) {
        res.status(200).send({
            status: false,
            data: `${err}`
        })
    }
})

UserRoute.post('/register', async (req, res) => {
    try { 
        let { body } = req;
        let user = await Register_User(body);
        res.status(200).send({
            status: true,
            data: user
        })
    } catch (err) {
        res.status(200).send({
            status: false,
            data: `${err}`
        })
    }
})
UserRoute.post('/login', async (req, res) => {
    try { 
        let { email, password } = req.body
        let user = await Login(email, password);
        res.status(200).send({
            status: true,
            data: user
        })
    } catch (err) {
        res.status(200).send({
            status: false,
            data: `${err}`
        })
    }
} )

UserRoute.post('/attend', async (req, res) => {
    try {
        let { _id, date, value } = req.body;
        let result = await Make_Attendance(_id, date, value)
        res.status(200).send({
            status: true,
            data: result
        })
     } catch (err) {
        res.status(200).send({
            status: false,
            data: `${err}`
        })
    }
})

UserRoute.post('/getAttendance', async (req, res) => {
        
    try {
        let { _id, date } = req.body;
        let result = await Get_AttendanceByDate(_id, date)
        res.status(200).send({
            status: true,
            data: result
        })
        
    } catch (err) {
        res.status(200).send({
            status: false,
            data: `${err}`
        })
    }
})

UserRoute.get('/all/:admin_id', async (req, res) => {
    try {
        let admin_id = req.params.admin_id;
        let users = await Get_User_with_Admin_Id(admin_id);
        res.status(200).send({
            status: true,
            data: users
        })
     } catch (err) {
        res.status(200).send({
            status: false,
            data: err
        })
    }
} )




module.exports = UserRoute;