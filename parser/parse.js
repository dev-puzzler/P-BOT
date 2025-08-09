const {  } = require('../dc/dc-cmd'); // 이 파일을 일단은 종속시키고 작업합니다...
const { DataUtil } = require('../core/util');

// commands
//
// Music play
// ex) // "!mp or !mplay or !play 제니 만트라" -> []
// LLM query
// ex) // "!q or !query LLM에게 질문하세요!" -> []
// research query
// ex) // "!rq or !rquery 여기 내용과 관련된 자료들을 찾습니다." -> []

const parse = (message) => {
    console.log("message :", message);

    message.content
}

module.export = { parse };