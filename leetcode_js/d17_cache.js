function set(){
    let cache = {};


    let timeout = setTimeout(() => {
        console.log(Date.now());
    }, 100);
    

    console.log(Date.now());
    const key = "key";
    cache[key] = {value: 1, timeout};
    console.log("end", Date.now());

    return 1;
}

console.log(set());

let o = {a: {a: 1}, b: {b: 2}};
for (let k in o) {
    console.log(k);
}