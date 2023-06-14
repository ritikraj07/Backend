const { Router } = require('express')

const myData = Router()

myData.get('/', async (req, res) => {
    res.send("Success")
 })

myData.post('/post', async (req, res) => {
    res.send("Success")
 })

myData.patch('/patch', async (req, res) => {
    res.send("Success")
 })

myData.put('/put', async (req, res) => {
    res.send("Success")
 })

myData.delete('/delete', async (req, res) => {
    res.send("Success")
 })

module.exports = myData