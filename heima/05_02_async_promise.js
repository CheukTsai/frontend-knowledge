/**
 * iv. 异步任务
 * a. 核心api
 * b. 函数封装
 * 
 * 1. 定义函数
 * 2. 调用核心api
 * 3. 调用函数
 */

// ------------------ 异步api ---------------------

// ------------------ 封装 ---------------------

// 1. 定义函数
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

// ------------------ 测试函数 ---------------------
// console.log('1');
// runAsyncTask(() => {
//     console.log("Async");
// })
// console.log('2');


// ------------------ 异步任务1 queueMicrotask ---------------------
// console.log('1');
// queueMicrotask(() => {
//     console.log('queueMicrotask');
// })
// console.log('2');


// ------------------ 异步任务2 MutationObserver ---------------------

// 1. 创建观察器
// const obs = new MutationObserver(() => {
//     console.log("MutationObserver");
// })

// 2. 创建元素，并添加监听
// 参数1 观察的节点
// 参数2 观察的选项（childlist 观察子节点变化）
// const divNode = document.createElement('div');
// obs.observe(divNode, {childList: true})
// divNode.innerText = 'hello';

// ------------------ 异步任务3 setTimeout ---------------------
// chrome, node


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

        // 使用封装函数       
        if (this.state === FULFILLED) {
            runAsyncTask(() => {
                onFulfilled(this.result);
            })
        } else if (this.state === REJECTED) {
            runAsyncTask(() => {
                onRejected(this.result);
            })
        } else if (this.state === PENDING) {
            this.#handlers.push({
                onFulfilled: () => {
                    runAsyncTask(() => {
                        onFulfilled(this.result);
                    })
                },
                onRejected: () => {
                    runAsyncTask(() => {
                        onRejected(this.result);
                    })
                }
            })
        }
    }
}

// ---------------

// --------------- 异步测试 ---------------
console.log('top');
const p = new MyPromise((resolve, reject) => {
    resolve("success");
})

p.then(res => {console.log("then1:", res)
}, err => {console.log("then1:", err)})

p.then(res => {console.log("then2:", res)
}, err => {console.log("then2:", err)})

console.log('bottom');
