function debounce(fn, t) {
    let timeout;

    return function(...args) {
        const _this = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(_this, args);
        }, t);
    }
}

class obj {
    timestamp = 0;
    startTime = 0;
    debounced = debounce(this.testFunc, 500);
    constructor() {

    }

    testFunc(a, b) {
        let curTime = Date.now();

        console.log("current Timestamp", curTime - this.startTime);
        console.log("Interval", curTime - this.timestamp);
        this.timestamp = curTime;
        return a + b;
    }
}

let o = new obj();
o.timestamp = Date.now();
o.startTime = o.timestamp;
o.debounced(1,2); // 500
setTimeout(() => {
    o.debounced(3, 4); // 1100
}, 600);
setTimeout(() => {
    o.debounced(6, 7); // 1300
}, 800);

