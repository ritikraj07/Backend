const { connect } = require("mongoose");

async function ConnectDatabase() {
    try {
        await connect('mongodb://127.0.0.1:27017/blog')
        console.log('Database Connected');
    } catch (err) {
        console.log({
            Not_connected: err
        })
    }
}

module.exports = ConnectDatabase;