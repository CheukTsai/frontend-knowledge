// rest arguments

// In JavaScript, the rest parameter is a feature that 
// allows a function to accept an indefinite number of arguments. 

//  It is denoted by three dots (...) followed by a parameter name. 

function indefiniteArgsFn(...args) {
    for (let arg of args) {
        console.log(arg);
    }
    return this;
}

indefiniteArgsFn(1,2,3);
indefiniteArgsFn([1,2,3]);

// spread operator / rest parameter

// spread:
// It spreads the elements out. 
// It's commonly used in situations where you need to 
// 1. combine or clone arrays, 
// 2. pass individual elements of an array as arguments to a function,
// 3. or convert an iterable into an array. 

const array = [1, 2, 3];
console.log([...array]); // Output: [1, 2, 3]

const string = "hello";
console.log([...string]); // Output: ['h', 'e', 'l', 'l', 'o']

const set = new Set([1, 2, 3]);
console.log([...set]); // Output: [1, 2, 3]

// rest:
// While the rest parameter is useful when 
// you want to write functions that can accept a variable number of arguments

// using rest
function argumentsLength(...args) {
    return args.length;
}

console.log(argumentsLength(1,2,3));

// using argument object
// In JavaScript, arguments are passed as an array-like object.
function argumentsLength2() {
    return arguments.length;
}

console.log(argumentsLength2(1,2,3));