/**
 * @param {Function[]} functions
 * @param {number} n
 * @return {Promise<any>}
 */
var promisePool = async function(functions, n) {
    let pending = 0, index = 0;
    let length = functions.length;
    let results = [];

    return new Promise((resolve) => {
        function helper() {
            if (index >= length) {
                if (pending === 0) resolve(results);
            }

            while (index < length && pending < n) {
                const curIndex = index;
                index++;
                pending++;
                functions[curIndex]().then(res => {
                    results[curIndex] = res;
                    pending--;
                    helper();
                })
            }
        }
        helper();
    }) 
};

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */