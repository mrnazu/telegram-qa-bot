const cron = require('node-cron');
const { getCurrentQuestionNumber, saveCurrentQuestionNumber } = require('./utils/fileUtils');
const { sendMessageToTelegram } = require('./utils/telegramUtils');
const { fetchQuestion } = require('./controllers/questionController');

async function postDailyQuestion() {
    const currentQuestionNumber = getCurrentQuestionNumber();
    console.log(`Posting question ${currentQuestionNumber} at ${new Date().toISOString()}`);
    const questionData = await fetchQuestion(currentQuestionNumber);
    if (questionData) {
        await sendMessageToTelegram(questionData, currentQuestionNumber);
        const nextQuestionNumber = (currentQuestionNumber % 10) + 1;
        saveCurrentQuestionNumber(nextQuestionNumber);
    } else {
        console.error(`Failed to fetch question ${currentQuestionNumber}`);
    }
}

// Schedule the cron job to run daily at 9 AM
cron.schedule('0 9 * * *', () => {
    console.log('Cron job triggered at', new Date().toISOString());
    postDailyQuestion();
}, {
    scheduled: true,
    timezone: "Africa/Addis_Ababa"
});

console.log('Cron job scheduled');

module.exports = { postDailyQuestion };