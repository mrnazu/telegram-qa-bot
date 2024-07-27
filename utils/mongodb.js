// utils/mongodb.js

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectToMongoDB = async () => {
    try {
        await client.connect();
        db = client.db('mybot');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
};

const getDb = () => db;

module.exports = { connectToMongoDB, getDb };