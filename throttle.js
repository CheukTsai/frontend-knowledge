function throttle(fn, delay) {
    let preTime = Date.now();

    return function() {
        let context = this;
        let args = arguments;
        let nowTime = Date.now();

        if (nowTime - preTime >= delay) {
            preTime = Date.now();
            return fn.apply(context, args);
        }

    }
};