function resolvePromise(promise) {
    if (promise instanceof Promise) return promise;

    else if (typeof promise.then === 'function') {
        let trueThen = promise.then;
        let _this = promise;
        return new Promise(trueThen.bind(_this))
    }

    return new Promise((resolve) => {resolve(promise)})
}

const resolvedThenable = resolvePromise({
    then(resolve, reject) {
      resolve(42);
    },
  });
resolvedThenable.then(res => console.log(res)); // 42