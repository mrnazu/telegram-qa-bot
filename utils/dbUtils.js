// utils/dbUtils.js

const { getDb } = require('./mongodb');

async function getCurrentQuestionNumber(callback) {
    try {
        const db = getDb();
        if (!db) {
            throw new Error('Database not connected');
        }
        const collection = db.collection('question_state');
        const doc = await collection.findOne({ id: 1 });

        callback(null, doc ? doc.question_number : 1);
    } catch (err) {
        console.error('Error fetching current question number:', err);
        callback(err);
    }
}

async function saveCurrentQuestionNumber(questionNumber) {
    try {
        const db = getDb();
        if (!db) {
            throw new Error('Database not connected');
        }
        const collection = db.collection('question_state');
        await collection.updateOne(
            { id: 1 },
            { $set: { question_number: questionNumber } },
            { upsert: true }
        );
    } catch (err) {
        console.error('Error saving question number:', err);
    }
}

module.exports = { getCurrentQuestionNumber, saveCurrentQuestionNumber };