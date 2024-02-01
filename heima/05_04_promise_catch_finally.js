/**
 */


function runAsyncTask(callback) {
    if (typeof queueMicrotask === 'function') {
        queueMicrotask(callback);
    } else if (typeof MutationObserver === 'function') {
        const obs = new MutationObserver(callback);
        const divNode = document.createElement('div');
        obs.observe(divNode, {childList: true});
        divNode.innerText = 'Tsai'
    } else {
        setTimeout(callback, 0)
    }
}

const PENDING = 'pending'
const FULFILLED = 'fullfilled'
const REJECTED = 'rejected'

class MyPromise {

    state = PENDING
    result = undefined

    #handlers=[]

    constructor(func) {
        
        const resolve = (result) => {

            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.result = result;
                
                this.#handlers.forEach(({onFulfilled}) => {
                    onFulfilled(this.result)
                })

            }
        }
        
        const reject = (result) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.result = result
                
                this.#handlers.forEach(({onRejected}) => {
                    onRejected(this.result)
                })
            }
        }

        try {
            func(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {

        onFulfilled = typeof onFulfilled === 'function' ? 
            onFulfilled : x => x;

        onRejected = typeof onRejected === 'function' ? 
            onRejected : x => {throw x};

        const p2 = new MyPromise((resolve, reject) => {
            if (this.state === FULFILLED) {
                runAsyncTask(() => {
                    try {
                        const x = onFulfilled(this.result);
                        resolvePromise(p2, x, resolve, reject)
                    } catch (error) {
                        reject(error);
                    }
                   
                })
            } else if (this.state === REJECTED) {
                runAsyncTask(() => {
                    try {
                        const x = onRejected(this.result);
                        resolvePromise(p2, x, resolve, reject)
                    } catch (error) {
                        reject(error);
                    }

                })
            } else if (this.state === PENDING) {
                this.#handlers.push({
                    onFulfilled: () => {
                        runAsyncTask(() => {
                            try {
                                const x = onFulfilled(this.result);
                                resolvePromise(p2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        })
                    },
                    onRejected: () => {
                        runAsyncTask(() => {
                            try {
                                const x = onRejected(this.result);
                                resolvePromise(p2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        })
                    }
                })
            }
        })

        return p2;
    }

    /**
     * catch方法
     * 1. 内部调用then方法
     * 2. 处理异常
     */

    catch(onRejected) {
        return this.then(undefined, onRejected);
    } 

    /**
     * finally方法
     * 1. 内部调用then方法
     */

    finally(onFinally) {
        return this.then(onFinally, onFinally);
    }
}

function resolvePromise(p2, x, resolve, reject) {
    if (x === p2) {
        throw TypeError('Chaining cycle detected for promise #<Promise>')
    }
    if (x instanceof MyPromise) {
        x.then(res => resolve(res), err => reject(err));
    } else {
        resolve(x);
    }
}

// --------------- 测试返回promise ---------------
const p = new MyPromise((resolve, reject) => {
    // resolve("success");
    throw 'throw-error';
})

p.then(res => {
    console.log("p1: ", res);
}).catch(err => {
    console.log('err:', err);
}).finally(() => {
    console.log('finally');
})
