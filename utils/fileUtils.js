const fs = require('fs');
const path = require('path');

const questionFilePath = path.join(__dirname, '../currentQuestion.json');

function getCurrentQuestionNumber() {
    if (fs.existsSync(questionFilePath)) {
        const data = fs.readFileSync(questionFilePath);
        const json = JSON.parse(data);
        return json.questionNumber || 1;
    }
    return 1;
}

function saveCurrentQuestionNumber(questionNumber) {
    const data = JSON.stringify({ questionNumber });
    fs.writeFileSync(questionFilePath, data);
}

module.exports = { getCurrentQuestionNumber, saveCurrentQuestionNumber };