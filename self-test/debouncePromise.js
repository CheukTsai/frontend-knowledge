// function debounce(fn, t, flag=false) {
//     let timeout;

//     return function(...args) {
//         const _this = this;
//         const shouldInvoke = !timeout && flag;
//         if (shouldInvoke) {
//             return new Promise((resolve) => {
//                 timeout = setTimeout(() => {
//                     timeout = null;
//                 }, t);
//                 resolve(fn.apply(_this, args));
//             })
//         }
//         clearTimeout(timeout);
//         return new Promise(function(resolve){
//             timeout = setTimeout(() => {
//                  if (!leading) resolve(fn.apply(_this, args));
//                  timeout = null;
//             }, t);
//         })
//     };
// }

// function debounce(fn, t) {
//     let timeout;
//     return function(...args) {
//         const _this = this;
//         return new Promise((resolve) => {
            
//             if (timeout) clearTimeout(timeout);
//             timeout = setTimeout(() => {
//                 let res = fn.call(_this, ...args);
//                 resolve(res)
//             }, t)
//         })
//     }
// }

function debounce(fn, t) {
    let timeout;
    return async function(...args) {
        const _this = this;
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            const res = fn.call(_this, ...args);
            return res;
        }, t);
    }
}


let startTime = Date.now();
function testFunc(a, b) {
    console.log(Date.now() - startTime);
    return a + b;
}

let debounced = debounce(testFunc, 1000);
debounced(3,4).then(res => console.log(res));
setTimeout(() => {
    debounced(3,8).then(res => console.log(res));
}, 500);
setTimeout(() => {
    debounced(3,9).then(res => console.log(res));
}, 800);