// function throttle1(fn, delay) {
//     let preTime = Date.now();

//     return function() {
//         let context = this;
//         let args = arguments;
//         let nowTime = Date.now();

//         if (nowTime - preTime >= delay) {
//             preTime = Date.now();
//             return fn.apply(context, args);
//         }

//     }
// };

function throttle(fn, t) {
    let timeout;
    let currentArgs;

    function delay() {
        fn(...currentArgs);
        currentArgs = null;
        timeout = setTimeout(() => {
            timeout = null;
            if (currentArgs) {
                delay();
            }
        }, t)
    }


    return function(...args) {
        currentArgs = args;
        if (!timeout) {
            delay();
        }
    }
}

let testObj = {
    totalStartTime: Date.now(),
    lastTriggerTime: Date.now(),
    startTime: 0
}

function testFunc(a, b) {
    let curTime = Date.now();
    if (this.startTime) {
        console.log("Terminal:", curTime - this.startTime)
    } 
    
    console.log("Current Timestamp:", curTime - this.totalStartTime);
    console.log(a + b);

}

testObj.testFunc = testFunc.bind(testObj);

function funcWrapper(fn, delay, ...args) {
    
    setTimeout(() => {
        testObj.startTime = Date.now();
        fn(...args)
    }, delay)
}

const throttled = throttle(testObj.testFunc, 2000);

funcWrapper(throttled, 0, 1, 2);
funcWrapper(throttled, 100, 3, 4);
funcWrapper(throttled, 200, 5, 8);
funcWrapper(throttled, 5000, 5, 6);
funcWrapper(throttled, 5100, 5, 6);
