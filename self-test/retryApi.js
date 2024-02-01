
function retryFunc(pFn, maxWait) {
    let promise = pFn();
    return new Promise(async(resolve, reject) => {
        setTimeout(reject, maxWait);
        try {
            const res = await promise;
            resolve(res);
        } catch (error) {
            reject(error);
        }
    })
}


async function retryApi(api, maxTries, maxWait) {
    let retry = 0;
    while (retry < maxTries) {
        retry++;
        try {
            const res = await retryFunc(api, maxWait);
            return res; 
        } catch (error){
            console.log("Retrying:", retry, "times")
        }
    }
    throw "Max Tries Exceed"
}

let targetApi = () => {
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve("api data received");
        }, 10000);
    })
}

async function hello() {
    throw "hello"
}

// retryApi(targetApi, 5, 1000).then(res => console.log(res)).catch((err) => console.log(err));
// console.log(retryApi(targetApi, 5, 1000));
console.log(hello())