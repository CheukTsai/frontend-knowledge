// let promise1 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("promise1");
        
//     }, 300);
// });


// let promise2 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("promise2");
        
//     }, 400);
// });

// let promise3 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("promise3");
        
//     }, 200);
// });

let promise1 = new Promise(res => setTimeout(res, 300));
let promise2 = new Promise(res => setTimeout(res, 400));
let promise3 = new Promise(res => setTimeout(res, 200));


// test functions 1
// let functions = [
//     () => promise1,
//     () => promise2,
//     () => promise3
// ]

// test functions 2
let functions = [
    () => new Promise(res => setTimeout(() => {res(2)}, 300)),
    () => new Promise(res => setTimeout(() => {res(3)}, 400)),
    () => new Promise(res => setTimeout(() => {res(4)}, 200))
  ]

var promisePool = async function (functions, n) {
    let results = [];
    const worker = async () => {
        if (functions.length) {
            results.push(await functions.shift()());
            await worker();
        }
    };

    await Promise.all(Array(n).fill(null).map(worker));
    return results;
};

let startTime = Date.now();

promisePool(functions, 2).then((res) => {
    let endTime = Date.now();
    console.log("TotalTime: ", endTime - startTime);
    console.log(res);
})
