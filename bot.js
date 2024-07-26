const axios = require('axios');
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');

const token = '7420968859:AAETB8kEAuzeiQupeItQnE82DinT3O8lzW8';
const channelUsername = '@testtestapi';

const bot = new TelegramBot(token, { polling: true });

async function fetchQuestion(questionNumber) {
    try {
        const response = await axios.get(`http://localhost:3000/api/creeds/:id/questions/${questionNumber}`);
        return response.data[0];
    } catch (error) {
        console.error(`Error fetching question ${questionNumber}:`, error);
        return null;
    }
}

async function sendMessageToTelegram(questionNumber) {
    const questionData = await fetchQuestion(questionNumber);
    if (questionData) {
        const message = `*Question ${questionNumber}:*\n${questionData.Question}\n\n*Answer:*\n${questionData.Answer}\n\n*Reference:*\n${questionData.Reference || "N/A"}`;
        await bot.sendMessage(channelUsername, message, { parse_mode: 'Markdown' });
        console.log(`Question ${questionNumber} posted successfully.`);
    } else {
        console.log(`Failed to post question ${questionNumber}.`);
    }
}

let questionNumber = 1;
cron.schedule('0 9 * * *', () => {
    sendMessageToTelegram(questionNumber);
    questionNumber++;
}, {
    scheduled: true,
    timezone: "Africa/Addis_Ababa"
});