require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const ConnectDatabase = require('./db/Connect.DB')
const authRoute = require('./Routes/auth.route')
const posts = require('./Routes/post.route')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send("all ok")
})

app.use('/auth', authRoute);
app.use('/post', posts);

ConnectDatabase()
    .then(() => {
        app.listen('3000', () => {
            console.log("Server connecter ");
    })
})
