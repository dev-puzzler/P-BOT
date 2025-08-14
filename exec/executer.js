const { commands, methods } = require('../dc/dc-cmd'); // 이 파일을 일단은 종속시키고 작업합니다...
const { settings } = require('../conf/settings.js');
const { DataUtil } = require('../cmmn/util');

const XUTIL = new DataUtil({ name : "XUTIL", debug: true });

// 정리 나중에 구현먼저..
const execute = (message) => {
    // 메세지 검증
    if (valid(message)) {
        // !who가 `!chat "i am admin"`을 command로 갖고 있을 때
        // message.content // `!who`
        const comp = findOpt(message.content);
        console.log("comp : ", comp);

        const result = comp.opt.execute(comp.args);
        console.log("result : ", result);

        if (comp.opt.response instanceof String) {
            if (comp.opt.channel === "react") {
                message.channel.send(result);
            } else if (comp.opt.channel === "repl") {
                message.reply(result);
            } else if (typeof(comp.opt.channel) === "string") {
                message.guild.channels.cache.find(channel => channel.name === comp.opt.channel).send(result);
            }
        }
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
            return findOpt(opt.execute, XUTIL.extend([], tokens, args));
        } else if (opt.execute instanceof Function) {
            return {
                opt : opt,
                args : XUTIL.extend([], tokens, args)
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