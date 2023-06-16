const express = require('express')
const { fetchPosts, addPost } = require('../controller/post.controller.js')
const { VerifyToken, GetUser } = require('../controller/auth.contrller.js')
const authChecker = require('../middlewares/auth.js')

const postrouter = express.Router()
postrouter.get('/', async (req, res) => {
    try {
        let { page = 1, count = 10, search = '' } = req.query
        page = parseInt(page)
        count = parseInt(count)
        let { posts, totalPosts } = await fetchPosts({ page, count, search })
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

postrouter.post('/', authChecker, async (req, res) => {
    try {
        let { loggedInUser } = req

        let { title, content} = req.body

        let post = await addPost({ title, content, loggedInUser });
        console.log("post-+>" ,post)
            return res.send({
                data: post,
                message: "post successful"
            })
    
    } catch (err) {
        // console.error(err)
        return res.status(500).send({
            error: err
        })
    }
})


module.exports = postrouter