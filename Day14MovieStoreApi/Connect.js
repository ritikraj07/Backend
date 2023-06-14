// const mongoose = require("mongoose")
import mongoose from 'mongoose';
async function connection() {
    
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/IMDB');
        console.log('connected')
    } catch (err) {
        console.log('Not connected')
    }
    
}

// module.exports = {connection}

export default connection