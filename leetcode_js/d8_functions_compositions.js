let functions = [x => x + 1, x => x * x, x => x * 2];

function compose1(functions) {

    return function(x) {
        for (let i = functions.length - 1; i >= 0; i--) {
            x = functions[i](x);
        }
        return x;
    }
}

function compose2(functions) {
    return (x) => functions.reduceRight((acc, f) => f(acc), x);
};

let x = 1;
let startTime = Date.now();
let f = compose1(functions);
let result = f(x);
let endTime = Date.now();
console.log(`compose1 result: ${result}, spent: ${endTime - startTime}`)

x = 1;
startTime = Date.now();
f = compose2(functions);
result = f(x);
endTime = Date.now();

console.log(`compose2 result: ${result}, spent: ${endTime - startTime}`)


// handling context
const obj = {
    value: 1,
    increment: function() {this.value++; return this.value;},
    double: function() {this.value *= 2; return this.valuel}
}

const badCompose = function(functions) {

    return function(x) {
        let result = x;
        for (let i = functions.length - 1; i >= 0; i--) {
            result = functions[i](result);
        }
        return result;
    };
};

const badComposedFn = badCompose([obj.increment, obj.double]);
console.log(badComposedFn(1));

const goodCompose = function(functions, context) {
    return function(x) {
        let result = x;
        for (let i = functions.length - 1; i >= 0; i--) {
            result = functions[i].call(context, result);
        }
        return result;
    };
};
// obj is now a parameter of obj
const goodComposeFn = goodCompose([obj.increment, obj.double], obj);
console.log(goodComposeFn(1));