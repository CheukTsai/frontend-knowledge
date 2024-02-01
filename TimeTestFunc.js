let testObj = {
    totalStartTime: Date.now(),
    lastTriggerTime: Date.now(),
    startTime: 0
}

function testFunc() {
    let curTime = Date.now();
    if (this.startTime) {
        console.log("Terminal:", curTime - this.startTime)
    } 
    console.log("Current Timestamp:", curTime - this.totalStartTime);
    this.startTime = 0;

}

testObj.testFunc = testFunc.bind(testObj);



function funcWrapper(fn, ...args) {
    testObj.startTime = Date.now();
    fn(...args)
}