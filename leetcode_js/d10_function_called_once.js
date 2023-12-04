// Modify function
// modifies a function such that it can only be called once

var once = function(fn) {
    let called = false;
    let result;
	return function(...args){
        // if (!called) {
        //     result = fn(...args);
        //     called = true;
        //     return result;
        // }
        // return;

        return fn(...args);
    }
};


function cretaeSpy(fn) {
    const spy = function (...args) {
        spy.callCount++;
        return fn(...args);
    };
    spy.callCount = 0;
    return spy;
}

function f(x) {
    return x + 2;
}

let fnSpy = cretaeSpy(f);

let onceFn = once(fnSpy);

let result = onceFn(1);

console.log(`Function called: ${fnSpy.callCount}`);
console.log(`Result: ${result}`);

result = onceFn(1);

console.log(`Function called: ${fnSpy.callCount}`);
console.log(`Result: ${result}`);