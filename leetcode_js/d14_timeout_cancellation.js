const cancellable = function(fn, args, t) {

    const timeoutId = setTimeout(function() {
      fn(args);
    }, t);
  
    const cancelFn = function() {
      clearTimeout(timeoutId);
    };
  
    return cancelFn;
};

const result = []

const fn = (x) => x * 5

const t = 30, cancelT = 50;

const start = performance.now() 

const log = (...argsArr) => {
    const diff = Math.floor(performance.now() - start);
    result.push({"time": diff, "returned": fn(...argsArr)})
}
     
const cancel = cancellable(log, [2], t);
          
setTimeout(cancel, cancelT)

setTimeout(() => {
     console.log(result) // [{"time":20,"returned":10}]
}, 65)