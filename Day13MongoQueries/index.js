const express = require('express');
const app = express();
const mongodb = require('mongodb');

const uri = 'mongodb+srv://ritikraj07:130000%40oK@test.1rtmoew.mongodb.net'; // Replace with your MongoDB connection string
const databaseName = 'myDatabase';
const collectionName = 'myCollection';

// Endpoint to handle bulk data insertion
app.post('/insertData', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const data = req.body; // Bulk data in JSON format

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents inserted.`);

        res.status(200).json({ message: `${result.insertedCount} documents inserted.` });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred.' });
    } finally {
        await client.close();
        console.log('Connection closed.');
    }
});

app.get('/', (req, res) => {
    
})


app.listen('3000', () => {
    console.log("Server Started")
})