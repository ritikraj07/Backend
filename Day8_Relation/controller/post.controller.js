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

async function addPost({title, content, userId}) {
    let user = await User.findById(userId);
    
    if (user) {
        console.log(user)
        const post = await Post.create({
            author: {
                userId,
                name: user.name,
                image: user.image
            },
            title: title,
            content: content
        })
        console.log("Before return -> ", post);
        return post;
    } else {
       throw new Error("User not found");
    }
}



module.exports = { fetchPosts, addPost}