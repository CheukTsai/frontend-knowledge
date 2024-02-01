/**
 * Before promises/async/await became the standard, it was a convention for async APIs in JavaScript to accept callbacks as the last argument.
 * Many async versions of Node.js APIs (e.g. fs.readFile and fs.rm) have such signatures. Node.js' util.promisify function was created to wrap around callback-based
 * unctions by returning Promises so that they can be used with async/await.
 *
 * Implement a function promisify that takes a function following the common callback-last error-first style,
 * i.e. taking a (err, value) => ... callback as the last argument, and returns a version that returns promises.
 */

// ------------------ test ----------------------
// 首先定一个需要进行 promisify 的函数
function asyncFn(a, b, callback) {
    // 异步操作，使用 setTimeout 模拟
    console.log('异步请求参数', a, b)
    setTimeout(function() {
            callback("不",'异步请求结果')
    }, 3000)
}

// 我们希望调用的方式是
const proxy = promisify(asyncFn)
proxy(11,22).then(res => {
    // 此处输出异步函数执行结果
    console.log(res)
}).catch(err => console.log(err));

// 定义一个方法， 需要针对异步方法做封装，所以需要一个入参，既需要promisify的原异步方法
/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
    return function(...args) { // 由于需要接收参数，所以参数我们可以写为...args
            // 我们需要执行异步操作，并返回一个结果，所以返回一个 promise实例
            const _this = this;
            
            return new Promise((resolve, reject) => {
                function callback(err, result) {
                    if (err) reject(err);
                    else resolve(result);
                }
                
                func.call(_this, ...args, callback)
            })
    }
}