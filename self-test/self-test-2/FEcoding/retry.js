function retryHelper(pFn) {
    let promise = pFn();
    return new Promise(async(resolve, reject) => {
        setTimeout(reject, 1000);
        try {
            const res = await promise;
            resolve(res);
        } catch (error) {
            reject(error);
        }
    })
}

function retry(fetchFunc, retryTimes) {

    return new Promise(async(resolve, reject) => {
        let retries = 0;

        while (retries < retryTimes) {
            retries++;
            console.log(`Current try: ${retries}`);
            try {
                const res = await retryHelper(fetchFunc);
                resolve(res);
                return res;
            } catch (error) {
                console.log("Retrying:", retries, "times")
            }
        }

        reject(`Retry limit ${retryTimes} reached`);
        
    })
}

function fetchApi(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("data received")
        }, 100);
    })
}


retry(fetchApi, 5).then(res => console.log(res), err => {
    console.log(err);
    process.exit();
});