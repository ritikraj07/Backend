// const express = require('express')
// const { connection } = require('./Connect')

import express from 'express'
import connection from './Connect.js'

import { imdb } from './Model/Movie.model.js'
const app = express()

app.use(express.json())


app.get('/', async (req, res) => {
    // let result = await imdb.create({ title: "Ritik" })
    res.send("<h1>Hello <br/> You have successfully call the api bro  </h1>")
})



app.get('/all', async (req, res) => {
    let result = await imdb.find({})
    // console.log(result)
    res.send(result)
})

app.post('/post', async (req, res) => {
    let data = req.body;
    console.log(data)
    let result = await imdb.create(data)
    res.send(result)
})

app.post('/update', async (req, res) => {
    let id = req.params.id
    let data = req.body
    console.log(id, data)
    let newData = await imdb.findOneAndUpdate({ _id: `ObjectId(${id})` }, { ...data })
    res.send(newData)

})
// http://localhost:3000/movies?q=cis
app.get('/movies', async (req, res) => {
    let { q = "", count = 10, page = 1, ord = 'title' } = req.query
    // console.log(q, count, page, ord)

    let data = await imdb.find({ title: { $regex: q } }).sort({ [ord]: 1 }).
        skip(count * page).limit(count)

    return res.send(data)
})





connection()
    .then(() => {
        app.listen(3000, () => {
            console.log("server stated")
        })
    })