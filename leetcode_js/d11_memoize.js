function memoize(fn) {
    let map = new Map();
    return function(...args) {
        let key = args.join(",");
        if (!map.has(key)) {
            let value = fn.apply(this, args);
            map.set(key, value);
        }
        return map.get(key);
    }
}

let testObj = {
    callCount: 0,
    testFunc: memoize(function(arr) {
        this.callCount++;
        return arr.reduce((a, c) => a + c, 0);
    })
}

let arr1 = [1,2,3];
let arr2 = [2,3,4];

console.log(testObj.testFunc(arr1));
console.log(testObj.callCount);
console.log(testObj.testFunc(arr1));
console.log(testObj.callCount);
console.log(testObj.testFunc(arr2));
console.log(testObj.callCount);
console.log(testObj.testFunc(arr1));
console.log(testObj.callCount);
console.log(testObj.testFunc(arr2));
console.log(testObj.callCount);