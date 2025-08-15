const { commands, methods } = require('../dc/dc-cmd'); // 이 파일을 일단은 종속시키고 작업합니다...
const { OptParser } = require('../parser/parse'); // 이 파일을 일단은 종속시키고 작업합니다...
const { DI } = require('./di'); // 이 파일을 일단은 종속시키고 작업합니다...
const { settings } = require('../conf/settings');
const { DataUtil } = require('../cmmn/util');

const XUTIL = new DataUtil({ name : "XUTIL", debug: true });

// 정리 나중에 구현먼저..
const execute = (message) => {
    // 메세지 검증
    if (valid(message)) {
        // !who가 `!chat "i am admin"`을 command로 갖고 있을 때
        // message.content // `!who`
        Invoker.invoke(findOpt(message.content, ["client",  message]));
    }
}

class Invoker {
    constructor() {}

    static invoke(request) {
        console.log("request : ", request);

        const opts = request.opt, args = request.args;

        if (!opts || !opts.execute || !(opts.execute instanceof Function)) {
            throw "실행가능한 명령이 아닙니다";
        }

        if (opts.channel) {
        }

        const parser = opts.parser || OptParser.getDefaultOpt;
        DI.call(opts.execute, parser.parse(args));
    }
}


//todo, 최적화 필요
const getOpts = () => {
    const hash = XUTIL.hash(JSON.stringify(czCommands));

    if (hash === commandHash) {
        // 일단 redis 캐시 대신..
        return cmdList;
    }

    commandHash = hash;
    cmdList = XUTIL.extend([], commands, czCommands);

    return cmdList;
}

const findOpt = (command, args) => {
    if (!command) {
        throw "명령어가 누락되었습니다.";
    }

    const tokens = XUTIL.tokenize(command);

    if (!tokens) {
        throw "명령어를 해석 할 수 없습니다.";
    }

    const cmd = tokens.shift().replace(settings.prefix, '');
    //todo, 개선필요
    const list = getOpts();

    for (let i=0; i<list.length; i++) {
        const opt = list[i];

        if (opt && opt.execute && XUTIL.isIn(opt.cmd, cmd)) {
            // (tokens, args) 순서로 솎아야 요청자의 인자가 후순위 병합
            return findOpt(opt.execute, [...tokens, ...args]);
        } else if (opt.execute instanceof Function) {
            return {
                opt : opt,
                args : [...tokens, ...args]
            };
        }
    }
}

const valid = (message) => {
    // 명령어 검증
    const command = message.content;
    if (!command || typeof(command) !== "string" || !command.startsWith(settings.prefix)) {
        throw "명령어가 올바르지 않습니다. cmd: " + command;
    }

    return true;
}

let cmdList = [];
let commandHash = "";
let czCommands = {};

module.exports = { execute };