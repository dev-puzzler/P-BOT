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

}

(function (){
    const TestUtil = new DataUtil({ name: 'TestUtil', debug: true });

    TestUtil.isIn(['apple', 'banana', 'cherry'], 'banana', 'grape'); // true;
    TestUtil.isIn('apple', 'banana', 'cherry'); // false;

    TestUtil.find(['apple', 'banana', 'cherry'], 'banana', 'grape'); // 'banana';
    TestUtil.find('apple', 'banana', 'cherry'); // null;
})();