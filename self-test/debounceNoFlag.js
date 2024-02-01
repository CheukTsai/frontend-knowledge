function debouncePure(fn, t) {
    let timeout;

    return function(...args) {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, t);
    }
}

let testObj = {
    timestamp: 0
}

function testFunc (a, b) {
    let currentTime = Date.now();
    if (this.timestamp) console.log(currentTime - this.timestamp);
    this.timestamp = currentTime;
    console.log(a + b);
}

testObj.testFunc = testFunc.bind(testObj);

let debouncePureFn = debouncePure(testObj.testFunc, 500);

testObj.timestamp = Date.now();
debouncePureFn(2,6);
setTimeout(() => {
    debouncePureFn(3, 7);
}, 100);
setTimeout(() => {
    debouncePureFn(3, 7);
}, 300);