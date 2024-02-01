function promiseAll(iterable, poolSize) {
    
    let length = iterable.length;
    
    return new Promise((resolve, reject) => {
        let results = [];
        let done = 0;
        let resolving = 0;
        let idx = 0;
        if (length === 0) resolve(results);

        function onDone() {
            resolving--;
            done++;
            
            if (done === length) resolve(results);
            run();
        }
        
        function run() {
            while (resolving < poolSize && idx < length) {
                let promise = funcs[idx]();
                const currentIdx = idx;
                idx++;
                resolving++;
                Promise.resolve(promise).then(res => {
                    results[currentIdx] = res;
                    onDone();
                })
            }
            
        }
        run();
    })
}

const funcs = [
    () => Promise.resolve(1),
    () => new Promise((resolve) => setTimeout(() => resolve(2), 200)),
    () => new Promise((resolve) => setTimeout(() => resolve(3), 400)),
    () => new Promise((resolve) => setTimeout(() => resolve(4), 600)),
]

let startTime = Date.now();
promiseAll(funcs, 2).then((res) => {
    console.log(Date.now() - startTime);
    console.log(res)
}, err => console.log(err));