class BaseUtil {
    constructor(settings) {
        this.settings = settings;
        this._debug(`${settings.name||"BaseUtil"} was initialized with settings:`, settings);
    }

    _debug(...args) {
        if (this.settings.debug) {
            console.log(...args);
        }
    }
}

const crypto = require('crypto');

class DataUtil extends BaseUtil {
    constructor(settings) {
        super(settings);
    }

    // 한개라도 일치하는 데이터가 있는지 확인
    isIn = (tgt, ...src) => {
        let target = tgt;

        if (!Array.isArray(tgt)) {
            target = [tgt];
        }

        for (const item of src) {
            if (target.includes(item)) {
                return true;
            }
        }

        return false;
    }

    // find
    find = (tgt, ...src) => {
        const find = [];

        let target = tgt;

        if (!Array.isArray(tgt)) {
            target = [tgt];
        }

        for (const item of src) {
            if (target.includes(item)) {
                find.push(item);
            }
        }

        return find;
    }

    //extend
    extend = (obj, ...src) => {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error('First argument must be an object');
        }

        for (const source of src) {
            if (typeof source === 'object' && source !== null) {
                Object.assign(obj, source);
            }
        }

        return obj;
    }

    //tokenize
    tokenize = (data) => {
        const tokens = [];

        if (typeof data === 'string') {
            // 문자열인 경우 공백과 콤마로 분리, 단 더블 쿼트로 감싸져있는 문자는 하나의 토큰으로 처리
            const regex = /"([^"]+)"|([\S,]+)/g;
            let match;
            while ((match = regex.exec(data)) !== null) {
                if (match[1]) {
                    // 더블 쿼트로 감싸진 부분
                    tokens.push(match[1]);
                } else if (match[2]) {
                    tokens.push(match[2]);
                }
            }
        }

        return tokens;
    }

    //hash
    hash = (data, algorithm = 'sha256') => {
        if (typeof data !== 'string') {
            throw new Error('Data must be a string');
        }
        const hash = crypto.createHash(algorithm);
        hash.update(data);
        return hash.digest('hex');
    }

}

(function (){
    const TestUtil = new DataUtil({ name: 'TestUtil', debug: true });

    TestUtil.isIn(['apple', 'banana', 'cherry'], 'banana', 'grape'); // true;
    TestUtil.isIn('apple', 'banana', 'cherry'); // false;

    TestUtil.find(['apple', 'banana', 'cherry'], 'banana', 'grape'); // 'banana';
    TestUtil.find('apple', 'banana', 'cherry'); // null;
})();

module.exports = { DataUtil };