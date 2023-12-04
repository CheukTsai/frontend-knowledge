var timeLimit = function(fn, t) {
    
    return async function (...args) {
        let exceeded = false;
        setTimeout(() => {
            exceeded = true;
        }, t);
        const res = await fn(args);
        return new Promise((resolve, reject) => {
            if (!exceeded) {
                resolve(res);
            } else {
                reject("Time Limit Exceeded");
            }
        }) 
    }
} 

fn = async (n) => { 
    await new Promise(res => setTimeout(res, 100)); 
    return n * n; 
  }
const inputs = [5]
const t = 5;
const limited = timeLimit(fn, t)
const start = performance.now()
let result;
try {
   const res = await limited(...inputs)
   result = {"resolved": res, "time": Math.floor(performance.now() - start)};
} catch (err) {
   result = {"rejected": err, "time": Math.floor(performance.now() - start)};
}
console.log(result)