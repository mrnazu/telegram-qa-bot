// controller/postController.js

const fs = require('fs');
const path = require('path');
const { sendMessageToTelegram } = require('../utils/telegramUtils');

const lastPostedFile = path.join('/tmp', 'last_posted.json');

function readLastPosted(callback) {
    fs.readFile(lastPostedFile, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                callback(null, {});
            } else {
                callback(err);
            }
        } else {
            callback(null, JSON.parse(data));
        }
    });
}

function saveLastPosted(questionNumber, callback) {
    const data = JSON.stringify({ questionNumber, timestamp: new Date().toISOString() });
    fs.writeFile(lastPostedFile, data, 'utf8', callback);
}

function checkAndPostQuestion(questionData, questionNumber, callback) {
    readLastPosted((err, lastPosted) => {
        if (err) {
            return callback(err);
        }

        const now = new Date();
        const lastPostedTime = new Date(lastPosted.timestamp || 0);

        const timeDifference = now - lastPostedTime;
        if (lastPosted.questionNumber === questionNumber && timeDifference < 60000) {
            console.log(`Question ${questionNumber} was recently posted. Skipping.`);
            return callback(null); // Skip posting
        }

        // Post the question
        sendMessageToTelegram(questionData, questionNumber)
            .then(() => {
                saveLastPosted(questionNumber, callback);
            })
            .catch(callback);
    });
}

module.exports = { checkAndPostQuestion };