require('dotenv').config();

// dc-bot.js 파일을 가져옵니다.
const { start } = require('./dc/dc-bot.js');

// 봇을 시작합니다.
start().catch(reason => {
    console.error(reason);
    process.exit(1); // 오류 발생 시 프로세스를 종료합니다.
});