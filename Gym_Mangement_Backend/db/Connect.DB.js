const mongoose = require("mongoose");


async function ConnectDatabase() {
    try {
        // await mongoose.connect('mongodb+srv://ritikraj:ritik@cluster0.7o8cg4q.mongodb.net/test');
        await mongoose.connect('mongodb://127.0.0.1:27017/gym');
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
        console.log("Could not connect the database");
    }
}

module.exports = ConnectDatabase;