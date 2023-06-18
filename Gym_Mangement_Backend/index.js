const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const ConnectDatabase = require('./db/Connect.DB')
const AdminRoute = require('./Routes/admin.route')
const UserRoute = require('./Routes/user.route')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send("all ok")
})

app.use('/admin', AdminRoute)
app.use('/user', UserRoute);
console.log(Date())

ConnectDatabase()
    .then(() => {
        app.listen('3000', () => {
            console.log("Server started");
        })
    })
