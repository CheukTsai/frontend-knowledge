var curry = function(fn) {
    let len = fn.length;
    let subArgs = [];
    return function curried(...args) {
        const _this = this;
        if (subArgs.length + args.length >= len) {
            return fn.call(_this, ...subArgs, ...args);
        } else {
            subArgs.push(...args);
            return curried;
        }
    }
};

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)(4));