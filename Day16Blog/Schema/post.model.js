const { Schema, model } = require('mongoose')

let PostSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    author_id: {
        type: String,
        require: true,
    },
    image:[String]

}, {
    timestamps:true
})

let Post = model("Post", PostSchema)
module.exports = Post;






// post.find({author_id:user_id})