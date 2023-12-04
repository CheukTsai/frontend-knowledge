function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        if (timeout) clearTimeout(timeout);

        let context = this;
        timeout = setTimeout(() => {
            fn.call(context, ...args);
        }, delay);
    };
};

const increment = debounce(function(num) {
    this.val += num;
}, 500);

const obj = {
    val: 2,
    increment: increment
};

obj.increment(2);

function toTest(num) {
    num += 2;
    return num;
};

const testFunction = debounce(function(fn, ...args){
    fn(...args);
    console.log(this);
    this.endTime = Date.now();
    console.log(this.endTime - this.startTime);
}, 500);

const log = {
    startTime: null,
    function: testFunction,
    endTime: null,
};

log.startTime = Date.now();
log.function(toTest, 4);
