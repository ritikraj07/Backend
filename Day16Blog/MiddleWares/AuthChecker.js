const crypt = require('bcryptjs');
const { VerifyToken } = require('../Controller/Auth.controller');

async function authChecker(req, res, next) {
    try {
        let headers = req.headers;
        const authorization = headers.authorization
        if (authorization) {
            let token = authorization.split(' ').pop()
            let user = VerifyToken(token)
            req.user = user
            next()
        } else {
            res.status(500).send("auth fail")
        }
    } catch (err) {
        res.status(500).send({ Message: err })
    }
}

module.exports = authChecker;