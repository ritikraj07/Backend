const express = require('express')
const app = express()
const cors = require('cors')
const employeeRouter = require('./router/employee.router')
let count = 0;
function logRequest(req, res, next) {
    console.log(new Date(), req.method, req.url)
    next()
}
function requestCount(req, res, next) {
    count++;
    console.log("Request no #", count);
    next()
}
app.use(cors())
app.use(logRequest)
app.use(requestCount)
app.use(express.static('static'))
app.use('/employee', employeeRouter)
// app.use((req, res, next) => {
//     res.setHeader("cess-Control-Allow-Origin", "*")
//     // next()
// })

app.get('/', (req, res) => {
    // logRequest(req)
 res.send("Hello world")   
})

app.get('/bye', (req, res) => {
    res.send("Bye world")
})


app.listen(3000,
    console.log("app is started")
)