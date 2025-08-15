const { DataUtil } = require('../cmmn/util');

const XUTIL = new DataUtil({ name : "XUTIL", debug: true });

// parse
class OptParser {
    constructor(options) {
        this.options = XUTIL.extend(OptParser.getDefaultOpt, options, { "client": ["client"] });
    }

    static getDefaultOpt = {
        "client" : ["client"],
        // posix(-), gnu(--) 모두 정의 고려
        "message" : ["-m", "--message"],
        "channel" : ["-c", "--channel"],
    }

    parse(args) {
        const param = {};

        console.log("args: ", args);
        console.log("this.options: ", this.options);

        for (let i=0; i<args.length; i++) {
            let isPushed = false;
            const token = args[i];

            for (const key in this.options) {
                if (XUTIL.isIn(this.options[key], token)) {
                    //todo, 바로 인접한 토큰을 값으로 사용, 인자를 여러 개 받고자 하는 경우 고려 필요
                    param[key] = args[++i];
                    isPushed = true;
                    break;
                }
            }

            if (!isPushed) {
                console.log("token : ", token);

                if (!Array.isArray(param.args)) {
                    param.args = [];
                }
                param.args.push(token);

            }
        }

        console.log("option parser param : ", param);

        return param;
    }
}

module.exports = { OptParser };