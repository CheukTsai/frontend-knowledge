function createBase(b){
    let base = b;

    function add(num) {
        base += num;
        return add;
    }

    add.valueOf = function() {
        return base;
    }

    return add;
}

let cb = createBase(6);
console.log(cb(3).valueOf());

console.log(cb(3)(5).valueOf());