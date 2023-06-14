const express = require('express')
const {fetchPosts, addPost} = require('../controller/post.controller.js')
const postrouter = express.Router()
postrouter.get('/', async (req, res) => {
    try {
        let { page = 1, count = 10, search = ''} = req.query
        page = parseInt(page)
        count = parseInt(count)
        let {posts, totalPosts} = await fetchPosts({page, count, search})
        return res.send({
            data: {
                records: posts,
                totalRecords: totalPosts
            }
        })
    } catch (err) {
        // console.error(err)
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

postrouter.post('/', async (req, res) => {
    try {
        let { title, content, userId} = req.body
        let post = await addPost({ title, content, userId }); 
        return res.send({
            data: post
        })
    } catch (err) {
        // console.error(err)
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})


module.exports = postrouter