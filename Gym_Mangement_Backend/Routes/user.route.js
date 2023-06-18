let { Router } = require('express');
const User = require('../Schema/user.model');
const { Register_User, Login, Make_Attendance, Get_User } = require('../Controller/user.controller');
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
UserRoute.get('/login', async (req, res) => {
    try { 
        let { email, password } = req.query
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
        // console.log(req.body)
    try {
        let { _id, admin_id, date, value } = req.body;
        let result = await Make_Attendance(_id, admin_id, date, value)
        res.status(200).send({
            status: true,
            data: result
        })
     } catch (err) {
        res.status(200).send({
            status: false,
            data: err
        })
    }
})


module.exports = UserRoute;