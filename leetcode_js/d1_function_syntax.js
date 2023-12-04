// Basic Syntax:
function f(a, b) {
    return a + b;
}
console.log(f(2,4));

// Anonymous Function:
// You can optionally exclude the name of the function after the function keyword.

let f_anonymous_function = function(a, b) {
    return a + b;
}
console.log(f_anonymous_function(2,4));

// Functions within Functions

function f_within_f() {
    function f(a, b) {
        return a + b;
    }
    return f;
}
let var_f_within_f = f_within_f();

console.log(var_f_within_f(2, 4));

// Function hoisting
function f_hoisting() {
    return f;
    function f(a, b) {
        return a + b;
    }
}

let var_f_hoisting = f_hoisting();
console.log(var_f_hoisting(2, 4));

// Closures
// When a function is created, it has access to a reference to
// all the variables declared around it, also known as it's lexical environment.
let f_createAdders = function(a) {
    function f(b) {
        return a + b;
    }
    return f;
}

let var_f_createAdders = f_createAdders(2);
console.log(var_f_createAdders(4));

// Arrow Syntax
const f_arrow = (a, b) => {
    return a + b;
}

console.log(f_arrow(2, 4));

// Omit return
const f_omit_return = (a, b) => a + b;

console.log(f_omit_return(2, 4));

// Arrow functions don't have their own bindings to this, arguments, or super, 
// and should not be used as methods.

// Arrow functions cannot be used as constructors. Calling them with new throws a TypeError. 
// They also don't have access to the new.target keyword.

// Arrow functions cannot use yield within their body and cannot be created as generator functions.

// Rest Arguments
function f_rest_arguments(...args) {
    return args[0] + args[1];

    // if the index is larger than the length, will retrun NaN if number;
    // undefined if not number
}

console.log(f_rest_arguments(2,4,5));

// Complex 
function log(inputFunction) {
    return function(...args) {
        console.log("Input:", args);
        const result = inputFunction(...args);
        console.log("Output:", result);
    }
}

const var_log = log((a, b) => a + b);
var_log(3, 4);