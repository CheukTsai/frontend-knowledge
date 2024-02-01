/**
 * v. 链式编程
 * 
 * 1. 返回新promise实例
 * 2. 获取返回值
 * 
 * 2.a. 处理返回值
 * 2.b. 处理异常
 * 2.c. 处理返回promise -> 调用then方法
 * 2.d. 处理反复引用 (Cycle) -> 抛出TypeError异常
 * 
 * ex.1 rejected状态
 * ex.2 pending状态
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

        func(resolve, reject);
    }

    then(onFulfilled, onRejected) {

        onFulfilled = typeof onFulfilled === 'function' ? 
            onFulfilled : x => x;

        onRejected = typeof onRejected === 'function' ? 
            onRejected : x => {throw x};

        // 1. 返回新Promise实例
        const p2 = new MyPromise((resolve, reject) => {
            if (this.state === FULFILLED) {
                runAsyncTask(() => {
                    // 2.获取返回值
                    try {
                        const x = onFulfilled(this.result);

                        // 调取函数
                        resolvePromise(p2, x, resolve, reject)
                    } catch (error) {
                        reject(error);
                    }
                   

                    // try {
                    //     // 2.a.1 处理返回值

                    //     // 2.d 处理反复引用
                    //     if (x === p2) {
                    //         throw TypeError('Chaining cycle detected for promise #<Promise>')
                    //     }

                    //     // 2.c 处理返回promise
                    //     if (x instanceof MyPromise) {
                    //         x.then(res => resolve(res), err => reject(err));
                    //     } else {
                    //         resolve(x);
                    //     }
                    // } catch (error) {
                    //     // 2.b 处理异常
                    //     reject(error);
                    // }
                })
            } else if (this.state === REJECTED) {
                runAsyncTask(() => {
                    // ex.1 处理异常
                    // ex.1 获取异常返回值
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
}

// ex.1 抽取函数
function resolvePromise(p2, x, resolve, reject) {
    // 2.a.1 处理返回值
    // 2.d 处理反复引用
    if (x === p2) {
        throw TypeError('Chaining cycle detected for promise #<Promise>')
    }

    // 2.c 处理返回promise
    if (x instanceof MyPromise) {
        x.then(res => resolve(res), err => reject(err));
    } else {
        resolve(x);
    }
}

// --------------- 测试 ---------------
// const p = new MyPromise((resolve, reject) => {
//     resolve("success");
// })

// p.then(res => {
//     console.log("p1: ", res);
//     return 2
// }).then(res => {
//     console.log("p2:", res);
// }, err => {
//     console.log("p2 error:", err);
// })

// --------------- 测试返回promise ---------------
const p = new MyPromise((resolve, reject) => {
    resolve("success");
})

p.then(res => {
    console.log("p1: ", res);
    return 2;
}).then(res => {
    console.log("p2:", res);
}, err => {
    console.log("p2 error:", err);
})
