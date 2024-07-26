const { postDailyQuestion } = require('./cron');

// This line is optional if I want to trigger postDailyQuestion manually for testing.
// postDailyQuestion(); 

console.log('Index file running. Cron job should be scheduled.');