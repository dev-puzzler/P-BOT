class DI {
    constructor(props) {
    }

    // 함수에서 매개변수 이름 추출
    static getParamNames(func) {
        const funcStr = func.toString();
        const match = funcStr.match(/\(([^)]*)\)/);

        if (!match || !match[1]) return [];

        return match[1]
            .split(',')
            .map(param => param.trim())
            .filter(param => param.length > 0);
    }

    // 함수 실행 (의존성 자동 주입)
    static call(func, args) {
        console.log("func : ", func);
        console.log("args : ", args);

        const paramNames = this.getParamNames(func);
        const param = paramNames.map(name => {
            console.log("name : ", name);

            // for (const item in args) {
            for (let i=0; i<args.length; i++) {
                console.log("args[i] : ", args[i]);
                // console.log("item : ", item);
            }

            return args[name] || null;
        });

        console.log("DI paramNames : ", paramNames);
        console.log("DI param : ", param);

        return func(...param);
    }
}

module.exports = { DI }