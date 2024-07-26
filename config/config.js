require('dotenv').config();

module.exports = {
    token: process.env.TELEGRAM_BOT_TOKEN,
    channelUsername: process.env.TELEGRAM_CHANNEL_USERNAME,
    apiUrl: 'https://reformed-api-erka.vercel.app/api/creeds/westminster_larger_catechism/questions/'
};