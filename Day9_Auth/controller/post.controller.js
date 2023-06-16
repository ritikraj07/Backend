const Post = require("../db/post.model");
const User = require("../db/user.model");

async function fetchPosts({ page, count,
    search
}) {
    let totalPosts = await Post.countDocuments({
        title: {
            $regex: `${search}`
        }
    });
    let skip = (page-1) * count
    let posts = await Post.find(
        {
        title: {
            $regex:`${search}`
        }
        }
    ).limit(count).skip(skip)
    return {
        posts,
        totalPosts
    }
}

async function addPost({ title, content, loggedInUser }) {
    console.log(title, loggedInUser, content)
        const post = await Post.create({
            author: {
                _id: loggedInUser._id,
                name: loggedInUser.name,
                image: loggedInUser.image
            },
            title: title,
            content: content
        })
        
        return post;
}



module.exports = { fetchPosts, addPost}