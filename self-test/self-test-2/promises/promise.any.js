function promiseAny(iterable) {
    let errors = [];
    const length = iterable.length;
    let pending = length;
    
    return new Promise(function(resolve, reject) {
        if (length === 0) reject(new AggregateError(errors));
        iterable.forEach((i, idx) => {
            Promise.resolve(i).then(res => {
                resolve(res);
            }, err => {
                errors[idx] = err;
                pending--;
                if (pending === 0) reject(new AggregateError(errors));
            })
        }) 
    })
}