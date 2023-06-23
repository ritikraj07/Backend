const { Router } = require("express");
const { Register, Login } = require("../Controller/Auth.controller");
const authChecker = require("../MiddleWares/AuthChecker");
const authRoute = Router();


authRoute.post('/register', async (req, res) => {
    try {
        let {email, password} = req.body
        let user = await Register(email, password)
        res.status(200).send(user)
        
    } catch (err) {
        return res.status(400).send({status: "fail", error: `${err}` })
    }
})

authRoute.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await Login(email, password)
        res.status(200).send({
            data: user,
            message: "successful login"
        })
    } catch (err) {
        res.status(400).send({
            message: `${err}`
        })
    }
})

authRoute.get('/loggedInUser',authChecker, async (req, res) => {
    try {
        let {user} = req
        res.send(user)
     } catch (err) {
        res.status(200).send(err)
    }
})



module.exports = authRoute;