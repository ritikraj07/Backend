const { Router } = require("express");
const { Register_Admin, Get_Admin } = require("../Controller/admin.controller");
const AdminRoute = Router();

AdminRoute.post('/register', async (req, res) => {
    try {
        let { email, password } = req.body
        console.log(password)
        let admin = await Register_Admin(email, password);
        return res.status(200).send({
            status: true,
            data: admin
        })
    } catch (err) {
        res.status(200).send({
            status: false,
            data: `${err}`
        })
    }
})

AdminRoute.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        let admin = await Get_Admin(email, password);
        return res.status(200).send({
            status: true,
            data: admin
        })
    } catch (err) {
        res.status(200).send({
            status: false,
            data: `${err}`
        })
    }
})



module.exports = AdminRoute;

