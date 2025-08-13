const { commands, methods } = require('../dc/dc-cmd'); // 이 파일을 일단은 종속시키고 작업합니다...
const { settings } = require('../conf/settings.js');
const { DataUtil } = require('../cmmn/util');

const XUTIL = new DataUtil({ name : "XUTIL", debug: true });

const findChannel = (message, name) => {
    return message.guild.channels.cache.find(channel => channel.name === name);
}

// 정리 나중에 구현먼저..
const execute = (client, contents) => {
    const cmdList = getCommandList();

    const fn = findFn(cmdList, contents);
    fn.invoke();
}

class Invoker {
    constructor(func, args) {
        this.func = func;
        this.args = args;
    }

    invoke() {
        if (this.func instanceof Function) {
            return this.func(...this.args);
        } else {
            throw new Error("Function is not defined or not a function.");
        }
    }
}

const findFn = (cmdList, command, args) => {
    if (!command) {
        throw "명령어가 정의되지 않았습니다.";
    }

    const tokens = XUTIL.extend([], XUTIL.tokenize(command), args);
    let cmd = tokens.shift();

    if (!cmd || !cmd.startsWith(settings.prefix)) {
        throw "정상적인 명령어 형태가 아닙니다. command: " + command;
    } else {
        cmd = cmd.replace(settings.prefix, "").trim();
    }

    if (typeof(cmd) == "string") {
        for (let i=0; i<cmdList.length; i++) {
            if (XUTIL.isIn(cmdList[i].cmd, cmd)) {
                return findFn(cmdList, cmdList[i].execute, XUTIL.extend(tokens, args));
            }
        }
    } else if (cmd instanceof Function) {
        return new Invoker(cmd, args);
    } else {
        throw "요구되는 명령어를 찾지 못했습니다. command: " + command;
    }
}

let cmdList = [];
let commandHash = "";
let czCommands = {};

const getCommandList = () => {
    const hash = XUTIL.hash(JSON.stringify(czCommands));

    if (hash === commandHash) {
        // 일단 redis 캐시 대신..
        return cmdList;
    }

    commandHash = hash;
    cmdList = XUTIL.extend({}, commands, czCommands);

    return cmdList;
}

module.exports = { execute };