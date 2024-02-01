function debounce(fn, t) {
    let timeout;

    return function(...args) {
        const _this = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(_this, args);
        }, t);
    }
}

let obj = {
    count: 0,
    debounce
}


debounced(4, 2);