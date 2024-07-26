const axios = require('axios');
const { apiUrl } = require('../config/config');

async function fetchQuestion(questionNumber) {
    try {
        console.log(`Fetching question ${questionNumber}...`);
        const response = await axios.get(`${apiUrl}${questionNumber}`);
        console.log(`Fetched question ${questionNumber}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching question ${questionNumber}:`, error);
        return null;
    }
}

module.exports = { fetchQuestion };