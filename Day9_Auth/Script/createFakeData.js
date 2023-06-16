
const { faker } = require('@faker-js/faker');
const User = require('../db/user.model');
const connectDatabase = require('../db/connectDatabase');
const crypto = require('crypto');
const Post = require('../db/post.model');
const Comment = require('../db/comment.model');
async function createUser(count = 10) {
    let users = []
    for (let i = 0; i < count; i++){
        let gender = Math.random() > 0.5 ? 'male' : 'female'
        let firstName = faker.name.firstName(gender);
        let lastName = faker.name.lastName()
        let user = {
            name: firstName + " " + lastName,
            gender,
            email: faker.internet.email(firstName, lastName),
            image: faker.image.avatar(),
            password: faker.internet.password(),
        }
        users.push(user)
        // await User.create(user)
    }
    let result = await User.create(users)
    console.log(result)

}
async function createPost(count = 100) {
    let users = await User.find()
    let posts = []
    for (let i = 0; i < count; i++) {
        const user = users[crypto.randomInt(0, users.length)]
        let post = {
            title: faker.hacker.phrase(),
            content: faker.lorem.paragraphs(5),
            author: {
                userId:user._id,
                image: user.image,
                name: user.name
            }
        }
        posts.push(post)
    }
    await Post.create(posts)
    console.log('Post added', count)
    
}
async function createComment(count = 100) {
    let users = await User.find()
    let posts = await Post.find()
    let comments = []
    for (let i = 0; i < count; i++) {
        const user = users[crypto.randomInt(0, users.length)]
        const post = posts[crypto.randomInt(0, posts.length)]
        let comment = {
            content: faker.lorem.paragraphs(1),
            user: {
                userId: user._id,
                image: user.image,
                name: user.name
            },
            post: {
                postId: post._id,
                title: post.title
            }
        }
        comments.push(comment)
    }
    await Comment.create(comments)
    console.log('comment added', count)

}

connectDatabase()
    .then(() => {
        createComment(100)
})