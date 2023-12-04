// Throw a string
function checkName(name) {
    if (name === '') {
        throw "Name can't be empty"
    }
    return name;
}

try {
    console.log(checkName(''));
} catch (error) {
    // same as console.error(error);
    // console.error() writes to stderr, 
    // whereas console.log() writes to stdout as described in the doc.
    console.log(error);
}

// Throwing an Error instance
function divide(numerator, denominator) {
    if (denominator === 0) {
        throw new Error("Cannot divide by 0!")
    }
    return numerator / denominator;
}

try {
    console.log(divide(5, 0));
} catch(error) {
    console.log(error);
    console.log(error.message);
}

// Throwing an Aggreated Error
// if you want to throw multiple errors together
// especially helpful for promises

let error1 = new Error("Error 1");
let error2 = new Error("Error 2");

try {
    throw new AggregateError([error1, error2], "Two errors occured");
} catch(error) {
    if (error instanceof AggregateError) {
        console.log(error);
        console.log(error.message);
        for (let e of error.errors) {
            console.log(e.message);
        }
    }
}