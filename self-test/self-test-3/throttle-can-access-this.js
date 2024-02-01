function throttle(fn, t) {
    let lastArgs = null;
    let timeout = null;

    function delay(){
        
        fn.call(this, ...lastArgs);
        lastArgs = null;
        timeout = setTimeout(() => {
            timeout = null;
            if (lastArgs) delay();
        }, t)
    }


    return function(...args) {
        lastArgs = args;
        const _this = this;
        console.log(this);
        if (!timeout) delay.bind(_this)();
    }
}

let throttled = throttle(function(a, b) {
    console.log(this.val);
    this.val += a + b;
}, 1000);

let obj = {
    val: 2,
    throttled
}

obj.throttled(3, 5);