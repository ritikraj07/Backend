const jwt = require('jsonwebtoken')

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJpdGlrIFJhaiIsImlhdCI6MTUxNjIzOTAyMn0.HK4sKAaOk3gcQ3CiCEwxCmm9AoL6Jbh_lXrVIWcqv3s"
let secret = "IamYourSecret"
let payload = jwt.decode(token)

payload = jwt.verify(token, secret)
console.log(payload)

let data = {
    name: "Ritik Raj",
    class: "V Human"
}

let anotherToken = jwt.sign(data, secret)
console.log("=====> ", anotherToken)