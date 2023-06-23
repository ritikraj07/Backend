const { Router } = require('express');
const authChecker = require('../MiddleWares/AuthChecker');
const { CreatePost, GetPostById, GetPostByAuthor, DeletePost, GetAllPost } = require('../Controller/Post.controller');
const { GetUserById } = require('../Controller/User.controller');

const posts = Router();

posts.post('/', authChecker ,async (req, res) => {
    try {
        let { user } = req;
        let { title, content, image } = req.body
        let post = await CreatePost({ user, title, content, image })
        user = await GetUserById(user._id)
        res.send({
            post: post,
            user: user
        })
        
     } catch (err) {
        res.status(400).send(err)
    }
} )
// http://localhost:3000/post/648d5dbf69c54c6e34ed24e0
posts.get('/', async (req, res) => {
    try {
        let {id} = req.query;
        let post = await GetPostById(id);
        res.status(200).send(post)
     } catch (err) {
        res.status(400).send({
            message: "No post found with this id",
            errorMessage: `${err}`
        })
    }
})

//return array of post posted by user
posts.get('/', authChecker, async (req, res) => {
    try {
        let { user } = req;
        let posts = await GetPostByAuthor(user._id);
        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send(err)
    }
})
posts.get('/all',authChecker ,async (req, res) => {
    let { page, count, search } = req.query;
        console.log("post rounte all ", page, count, search)
    try {
        let posts = await GetAllPost({ page, count, search})
        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send("imyourerror")
    }
})

posts.delete('/', authChecker, async (req, res) => {
    try {
        let { id } = req.query
        let { user } = req
        let post = await DeletePost(id, user._id)
        res.status(200).send(post)
    } catch (err) {
        res.status(400).send(err)
    }
})

posts.patch('/', authChecker, async (req, res) => {
    try {
        let { user } = req;
        let {id} = req.params
        let { title, content, image } = req.body


    } catch (err) {
        res.status(400).send(err)
    }
})






module.exports = posts;