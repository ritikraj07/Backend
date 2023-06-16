const express = require('express');
const { register, login, VerifyToken } = require('../controller/auth.contrller');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

const authChecker = require('../middlewares/auth');
authRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        let user = await register(name, email, password)
        console.log("======> ", user)
        res.status(200).send({
            message: "Registration Successful",
            user: user
        })
    } catch (err) {
        // console.error(err)
        
        return res.status(400).send(`Something went wrong! ${err} `)
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        let response = await login(email, password)
        res.send({
            response: response,
            message: "login successful"
        })
    } catch (err) {
        return res.status(400).send(`Something went wrong! ${err} ` )
    }
})

authRouter.get('/loggedInUser', authChecker ,async (req, res) => {
    try {
        let { loggedInUser } = req
        res.status(200).send({
            data: loggedInUser
        })
    } catch (err) {
        res.status(500).send(err)
    }
    
   
})


module.exports = authRouter;