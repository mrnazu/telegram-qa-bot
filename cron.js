// cron.js

const cron = require('node-cron');
const { getCurrentQuestionNumber, saveCurrentQuestionNumber } = require('./utils/dbUtils');
const { fetchQuestion } = require('./controllers/questionController');
const { checkAndPostQuestion } = require('./controllers/postController');

const { connectToMongoDB } = require('./utils/mongodb');

const MAX_QUESTION_NUMBER = 200;

async function postDailyQuestion() {
    try {
        getCurrentQuestionNumber(async (err, currentQuestionNumber) => {
            if (err) {
                console.error('Error fetching current question number:', err);
                return;
            }

            console.log(`Posting question ${currentQuestionNumber} at ${new Date().toISOString()}`);

            const questionData = await fetchQuestion(currentQuestionNumber);

            if (questionData) {
                checkAndPostQuestion(questionData, currentQuestionNumber, async (err) => {
                    if (err) {
                        console.error(`Error posting question ${currentQuestionNumber}:`, err);
                    } else {
                        const nextQuestionNumber = (currentQuestionNumber % MAX_QUESTION_NUMBER) + 1;

                        await saveCurrentQuestionNumber(nextQuestionNumber);

                        console.log(`Question number updated to ${nextQuestionNumber}`);
                    }
                });
            } else {
                console.error(`Failed to fetch question ${currentQuestionNumber}`);
            }
        });
    } catch (error) {
        console.error('Error in postDailyQuestion:', error);
    }
}

connectToMongoDB().then(() => {
    console.log('MongoDB connection established successfully.');

    cron.schedule('*/5 * * * * *', () => {
        console.log('Cron job triggered at', new Date().toISOString());
        postDailyQuestion();
    }, {
        scheduled: true,
        timezone: "Africa/Addis_Ababa"
    });

    console.log('Cron job scheduled to run every 5 seconds for testing purposes.');
}).catch(err => {
    console.error('Error establishing MongoDB connection:', err);
});

module.exports = { postDailyQuestion };