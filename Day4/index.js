const express = require('express')
const fs = require('fs')
const server = express()
server.use(express.json())
server.get('/', (req, res) => {
    res.end("Hello devil")
})
server.get('/welcome', (req, res) => {
    let query = req.query
    console.log(query)
    res.send("welcome back")

})
server.get('/:filename', (req, res) => {
    const filename = req.params.filename
    try {
        const content = fs.readFileSync(`../Day4/test/${filename}`, {
           'encoding':'utf-8'
        })
        res.send(content)
    } catch (err) {
        console.log(err.message)
        res.status(404).send("some wrong")
    }
} )
server.post('/post', (req, res) => {
    console.log(req.body)
    res.send("Hello Devil")
} )

server.post('/name/:name', (req, res) => {
    let parm = req.params.name
    let body = req.body
    console.log(body)
    res.send("Hello Devil" + parm)
})

server.listen(3030, () => {
    console.log("server started")
})