/**
 * Promise.all() is a method that takes an iterable of elements (usually Promises) as an input, 
 * and returns a single Promise that resolves to an array of the results of the input promises. 
 * This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. 
 * It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.
 */

function promiseAll(iterable) {
    let results = [];
    const length = iterable.length;
    let pending = length;
    if (length === 0) return new Promise((resolve) => resolve([]));
    return new Promise(function(resolve, reject) {
        iterable.forEach((i, idx) => {
            Promise.resolve(i).then(res => {
                results[idx] = res;
                pending--;
                if (pending === 0) resolve(results);
            }, err => {
                reject(err);
            })
        }) 
    })
}