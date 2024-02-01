function debounce(fn, wait) {
    let timer = null;

    return function() {
        let context = this;
        args = arguments;

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait)
    };
};


let testObj = {
    totalStartTime: Date.now(),
    lastTriggerTime: Date.now(),
    startTime: 0
}

function testFunc() {
    let curTime = Date.now();
    console.log(this);
    if (this.startTime) {
        console.log("Terminal:", curTime - this.startTime)
    } 
    console.log("Current Timestamp:", curTime - this.totalStartTime);
    this.startTime = 0;

}

testObj.testFunc = testFunc;



function funcWrapper(fn, ...args) {
    testObj.startTime = Date.now();
    fn(...args)
}

let debounced = debounce(testObj.testFunc, 300);
let startTime = 100

setTimeout(() => {
    funcWrapper(debounced, 1, 2);
}, startTime)
setTimeout(() => {
    funcWrapper(debounced, 1, 2);
}, 200)
setTimeout(() => {
    funcWrapper(debounced, 8, 9);
}, 600);