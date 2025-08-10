const { commands, methods } = require('../dc/dc-cmd'); // 이 파일을 일단은 종속시키고 작업합니다...
const { settings } = require('../conf/settings.js');
const { DataUtil } = require('../cmmn/util');

const XUTIL = new DataUtil({ name : "XUTIL", debug: true });

const findChannel = (message, name) => {
    return message.guild.channels.cache.find(channel => channel.name === name);
}

// 정리 나중에 구현먼저..
const execute = (client, contents, args) => {
    const tokens = XUTIL.extend([], XUTIL.tokenize(contents), args);
    const cmd = tokens.shift();
    const conf = findConf(cmd.replace(settings.prefix, ""));

    let fn = conf.execute;

    if (fn instanceof Function) {
        fn = fn(tokens);
    } else if (typeof(fn) == "string") {
        fn = execute(client, fn, tokens);
    }
}

const invoke = (client, conf) => {

}

const findConf = (cmd) => {
    const commands = getAllCommands();

    let command = null;
    for (const key in commands) {
        if (XUTIL.isIn(commands[key].cmd, cmd)) {
            command = commands[key];
            break;
        }
    }

    return command;
}

let cmdList = [];
let commandHash = "";
let czCommands = {};

const getAllCommands = () => {
    const hash = XUTIL.hash(JSON.stringify(czCommands));

    if (hash == commandHash) {
        return cmdList;
    }

    commandHash = hash;
    cmdList = XUTIL.extend({}, commands, czCommands);
    // console.log("cmdList2 : ", cmdList);

    return cmdList;
}

module.exports = { execute };