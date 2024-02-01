/**
 * i. 构造函数
 * 1. 定义类
 * 2. 添加构造函数
 * 3. 定义resolve/reject
 * 4. 执行回调函数
 * 
 * ------------------------
 * 
 * ii. 状态及原因
 * 1. 添加状态
 * 2. 添加原因
 * 3. 调整reject/resolve
 * 4. 状态不可逆！
 * 
 *  ------------------------
 * 
 * iii. then方法
 * a. 成功和失败回调
 * b. 异步和多次调用
 * 
 * a. 成功和失败回调
 * 1. 添加实例方法
 * 2. 参数判断
 * （如果onFulfilled不是一个函数，会改为(x) => x函数）
 * （onRejected会被改为catch()的返回值）
 * 2.1 执行成功回调
 * 2.2 执行失败回调
 * 
 * b. 异步和多次调用
 * 1. 定义实例属性
 * 2. 保存回调函数
 * 2.1 调用成功回调
 * 2.2 调用失败回调
 * 
 * ------------------------
 * iv. 
 */

// ii.0.通过变量保存状态
const PENDING = 'pending'
const FULFILLED = 'fullfilled'
const REJECTED = 'rejected'
// i.1. 定义类
class MyPromise {

    state = PENDING
    result = undefined

    // iii.b.1.2.
    // 定义实例属性并保存回调函数
    #handlers=[]
    // i.2.添加构造函数
    constructor(func) {
        
        // i.3. 定义resolve/reject
        // ii. 改状态：pending -> fulfilled
        // ii. 记录原因
        // 箭头函数的this会访问上一级作用域（即构造函数，即实例）
        const resolve = (result) => {
            // ii.4. 状态不可逆
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.result = result;
                
                // iii.b.2.1调用成功回调
                this.#handlers.forEach(({onFulfilled}) => {
                    onFulfilled(this.result)
                })

            }
        }

        // ii. 改状态：pending -> rejected
        // ii. 记录原因
        
        const reject = (result) => {
            // ii.4. 状态不可逆
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.result = result
                
                // iii.b.2.2调用失败回调
                this.#handlers.forEach(({onRejected}) => {
                    onRejected(this.result)
                })
            }
        }

        // i.4. 执行回调函数
        func(resolve, reject);
    }

    // iii.1.添加实例方法
    then(onFulfilled, onRejected) {
        // （如果onFulfilled不是一个函数，会改为(x) => x函数）
        onFulfilled = typeof onFulfilled === 'function' ? 
            onFulfilled : x => x;

        // （onRejected会被改为catch()的返回值）
        onRejected = typeof onRejected === 'function' ? 
            onRejected : x => {throw x};

        if (this.state === FULFILLED) {
            onFulfilled(this.result);
        } else if (this.state === REJECTED) {
            onRejected(this.result);
        } else if (this.state === PENDING) {
            this.#handlers.push({
                onFulfilled, onRejected
            })
        }
    }
}

// --------------- 普通测试 ---------------

// const p = new MyPromise((resolve, reject) => {
//     console.log("Start executing")
//     resolve("success");
//     // reject('error');
// })

// p.then((res) => console.log("成功", res));

// --------------- 异步测试 ---------------
const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
        reject("error");
    }, 2000);
})

p2.then(res => {console.log("then1:", res)
}, err => {console.log("then1:", err)})

p2.then(res => {console.log("then2:", res)
}, err => {console.log("then2:", err)})