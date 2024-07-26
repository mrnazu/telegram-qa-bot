require('dotenv').config();

module.exports = {
    token: process.env.TELEGRAM_BOT_TOKEN,
    channelUsername: process.env.TELEGRAM_CHANNEL_USERNAME,
    apiUrl: 'http://localhost:3000/api/creeds/westminster_larger_catechism/questions/'
};