const mongoose = require('mongoose')

async function connectDatabase() {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/testDrive');
        await mongoose.connect('mongodb+srv://ritikraj07:imritikraj@cluster0.zvx9zpw.mongodb.net/employees?appName=mongosh+1.8.0');
        console.log('connected')
    } catch (err) {
        console.log('Not connected')
    }
}
module.exports = connectDatabase