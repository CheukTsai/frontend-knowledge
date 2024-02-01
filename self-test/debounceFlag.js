function debounce(fn, t, immediate) {
    let timeout;

    return function(...args) {
        
        let shouldCall = timeout == null && immediate;
        if (shouldCall) {
            fn(...args);
        }

        if (!immediate) clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (!immediate) {
                fn(...args);
            }
            timeout = null;
        }, t);
    }
}

let testObj = {
    timestamp: 0
};

function testFunc(a, b) {
    let currentTime = Date.now();
    if (this.timestamp) console.log('Interval:', currentTime - this.timestamp);
    this.timestamp = currentTime;
    console.log('result', a + b);
}

testObj.testFunc = testFunc.bind(testObj);

testObj.timestamp = Date.now();

let debounced = debounce(testObj.testFunc, 500, true);
debounced(5, 6); // 0
setTimeout(() => {
    debounced(3, 4);
}, 400) // 600 x
setTimeout(() => {
    debounced(5, 8);
}, 1000); // 900