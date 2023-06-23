let {VerifyToken, GetUser}  = require('../controller/auth.contrller.js')
async function authChecker(req, res, next) {
    try {
        let headers = req.headers
        const authorization = headers['authorization']
        
        if (authorization) {
            const token = authorization.split(" ").pop()
            let payload = VerifyToken(token)
            let user = await GetUser(payload._id)
            req.loggedInUser = user
            
            next();
        } else {
            res.status(500).send("auth fail")
        }
     } catch (err) {
        res.status(500).send({Message:err})
    }
  
}

module.exports = authChecker