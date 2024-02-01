function throttle(fn, t) {
    let timeout;
    let lastArgs = null;
    const _this = this;
    function helper() {
        
        fn.apply(_this, lastArgs);
        lastArgs = null;
        timeout = setTimeout(() => {
            timeout = null;
            if (lastArgs) helper();
        }, t);
    }

    return function(...args) {
        
        lastArgs = args;
        if (!timeout) helper();
    }
}

let startTime = Date.now();
let timestamp = Date.now();

function testFunc(a, b) {
    const curTime = Date.now();
    console.log("current timestamp", curTime - startTime);
    console.log("Time from last call", curTime - timestamp);
    timestamp = curTime;
    return a + b;
}

let throttled = throttle(testFunc, 1000);

throttled(2,3);
throttled(4,5);
throttled(6,7);