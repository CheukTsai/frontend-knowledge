/**
 * @param {number} initialValue
 * @return {Function}
 */
function makeCounter(initialValue) {
    let init = initialValue;
    return function() {
        init++;
        console.log(init);
        return init - 1;
    }
}

let func = makeCounter(5)