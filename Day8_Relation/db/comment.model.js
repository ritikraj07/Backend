const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 10,
        required: true
    },
    user: {
        userId: String,
        image: String,
        name: String
    },
    post: {
        postId: String,
        title: String
    }
}, {
    timestamps: true

})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;