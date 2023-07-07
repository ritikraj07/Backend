const mongoose = require('mongoose')

async function connectDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/relations');
        
        console.log('connected')
    } catch (err) {
        console.log('Not connected')
    }
}
module.exports = connectDatabase
