// utils/telegramUtils.js

const TelegramBot = require('node-telegram-bot-api');
const { token, channelUsername } = require('../config/config');

const bot = new TelegramBot(token, { polling: true });

async function sendMessageToTelegram(questionData, questionNumber) {
    if (questionData) {
        const creedName = 'Westminster Larger Catechism';
        const references = questionData.Proofs.flatMap(proof => proof.References);
        const formattedReferences = require('./formatUtils').formatReferences(references);

        const message = `*${creedName}*\n*Question ${questionNumber}:*\n${questionData.Question}\n\n*Answer:*\n\`${questionData.Answer}\`\n\n*References:*\n${formattedReferences || "N/A"}\n\n*Follow us:* ${channelUsername}`;

        try {
            await bot.sendMessage(channelUsername, message, { parse_mode: 'Markdown' });
            console.log(`Question ${questionNumber} posted successfully.`);
        } catch (error) {
            console.error(`Failed to send message to Telegram:`, error);
        }
    } else {
        console.log(`Failed to fetch question ${questionNumber}.`);
    }
}

module.exports = { sendMessageToTelegram };