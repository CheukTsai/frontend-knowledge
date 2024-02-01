function debounce(fn, delay) {
    let timeout;

    return function(...args) {
        const _this = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.call(_this, ...args);
        }, delay)
    }
}

let testFunc = function(a, b){
    this.val += a + b;
    console.log(this);
    console.log(this.val);
}

let debounced = debounce(testFunc, 1000);

let obj = {
    val: 1,
    debounced
}

obj.debounced(3, 5);