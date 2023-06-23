const express = require('express');
const { register, login, VerifyToken, signInWithGithub } = require('../controller/auth.contrller');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const authChecker = require('../middlewares/auth');
authRouter.post('/register', async (req, res) => {
    console.log("=============> ")
    try {
        const { name, email, password } = req.body
        let user = await register(name, email, password)
        res.status(200).send({
            message: "Registration Successful",
            user: user
        })
    } catch (err) {
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


authRouter.get('/signInWithGithub/:code', async (req, res) => {
    try {
        let { code } = req.params;
        console.log(code)
        let url = `https://github.com/login/oauth/access_token?client_id=c448e822c95742e37368&client_secret=b9198ffaaeb013326a576a42b35fb4bebb4c91bd&code=${code}`
        let response = await axios.post(url, null, {
            headers:{
            "accept":"application/json"
            }
        });
        
        let { access_token } = response.data;
        let url2 = 'https://api.github.com/user'
        
        let userDetailResponse =await axios.get(url2, {
            headers: {
                'Authorization':`Bearer ${access_token}`
            }
        })
        let { name, login, avatar_url, email } = userDetailResponse.data;
        let user = await signInWithGithub({ name, login, avatar_url, email });
        res.send(user)

    } catch (err) {
        res.status(400).send(err);
    }
})


module.exports = authRouter;