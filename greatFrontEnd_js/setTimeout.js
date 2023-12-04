function fn() {
    console.log("hello");
}

setTimeout(() => {
    fn();
}, 500)

setTimeout(fn, 500)