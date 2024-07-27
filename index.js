// index.js

const keep_alive = require('./keep_alive')
const { connectToMongoDB } = require('./utils/mongodb');
const { postDailyQuestion } = require('./cron');

// Connect to MongoDB
connectToMongoDB().then(() => {
    console.log('MongoDB connection established successfully.');
    postDailyQuestion();
}).catch(err => {
    console.error('Error establishing MongoDB connection:', err);
});