const Post = require("../Schema/post.model")

async function CreatePost({ user, title, content, image }) {
    try {
        let post = await Post.create({
            title: title,
            content: content,
            author_id: user._id,
            image: image
        })
        return post
    } catch (err) {
        throw new Error(err)
    }
}

async function GetPostById(id) {
    return await Post.findById(id)
    
}

async function GetPostByAuthor(id) {
    try {
        let post = await Post.find({
            author_id: id
        })
        return post;
    } catch (err) {
        throw Error(err)
    }
}
async function GetAllPost({ page = 1, count = 10, search = "" }) {

    return await Post.find({
        title: {
            $regex: `${search}`
        }
    }).limit(count).skip((page - 1) * count)
}

async function DeletePost(PostId, author_id) {
    let post = Post.findOneAndDelete({ _id: PostId, author_id: author_id });
    if (post) {
        return post;
    } else {
        return ("No post found")
    }

}


module.exports = { CreatePost, GetPostById, GetPostByAuthor, DeletePost, GetAllPost }