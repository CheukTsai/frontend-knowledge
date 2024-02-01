function debounce(fn, t, leading=false) {
    let timeout;
    return function(...args) {
        const _this = this;
        const shouldCall = leading && timeout == null;
        if (shouldCall) {
            fn.apply(_this, args);
        }
        if (!leading) clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (!leading) fn.apply(_this, args);
            timeout = null;
        }, t);
    }
}

class obj {
    timestamp = 0;
    startTime = 0;
    debounced = debounce(this.testFunc, 500, true);
    constructor() {

    }

    testFunc(a, b) {
        let curTime = Date.now();
        console.log(this);
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

