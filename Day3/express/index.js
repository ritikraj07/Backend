const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    console.log(req.url)
    // res.send("ok")
    res.end('<h1> response ended </h1>')
})

app.get('/public', (req, res) => {
    console.log(req.url)
    res.send("ok")
    res.end('<h1> response ended </h1>')
})

app.get('/public/other', (req, res) => {
    console.log(req.url)
    res.send("ok")
})

app.listen(3030, (err) => {
    if (err) {
        console.log('error', err)
    } else {
        console.log("Server Started")
    }

})
