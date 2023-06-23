const mongoose = require('mongoose')

async function connectDatabase() {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/testDrive');
        await mongoose.connect('mongodb+srv://ritikraj:ritik@cluster0.7o8cg4q.mongodb.net/');
        console.log('connected')
    } catch (err) {
        console.log('Not connected', err)
    }
}
module.exports = connectDatabase
