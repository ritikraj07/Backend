const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const ConnectDatabase = require('./DB')
const PasteBinRouter = require('./Router/pastebin.route.js')


app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("ok")
})

app.use('/pastebin', PasteBinRouter)


ConnectDatabase()
    .then(() => {
        app.listen('8000', () => {
            console.log("Server Started")
        })
})

        
