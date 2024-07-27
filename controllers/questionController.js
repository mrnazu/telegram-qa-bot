// controller/questionController.js

const axios = require('axios');
const { apiUrl } = require('../config/config');

async function fetchQuestion(questionNumber) {
    try {
        const url = `${apiUrl}${questionNumber}`;
        console.log(`Fetching question from URL: ${url}`);
        const response = await axios.get(url);
        console.log(`Fetched question ${questionNumber}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching question ${questionNumber}:`, error.response ? error.response.data : error.message);
        return null;
    }
}

module.exports = { fetchQuestion };