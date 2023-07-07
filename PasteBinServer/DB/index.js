const {connect} = require('mongoose')

async function ConnectDatabase() {
    try {
        // await connect('mongodb://127.0.0.1:27017/pastebin')
        await mongoose.connect('mongodb+srv://ritikraj07:imritikraj@cluster0.zvx9zpw.mongodb.net/pastebin?appName=mongosh+1.8.0');
        console.log('Database Connected')
    } catch (error) {
        console.log('Database not connected')
    }
}

module.exports = ConnectDatabase