// function func() {
//     'use strict';
//     console.log(this); // undefined
// }
// func()

// const food = {
//     name: "burger",
//     eat: eat
// }
// function eat() {
//     console.log(this)
// }

// food.eat()

// -------- 2. assign this --------
// function func(numA, numB) {
//     console.log(this)
//     console.log(numA, numB)
// }

// const person = {
//     name: 'Tsai'
// }

// 2.1 bind
// const bindFunc = func.bind(person, 666);
// bindFunc(888)

let testObj = {
    name: "testObj",
    testFunc: function() {
        const callThis = () => {
            console.log(this);
        }
        callThis();
     }
}


// function testFunc() {
//     console.log(this);

// }

// const testFunc = () => {
//     console.log(this);
// }

// testObj.testFunc = testFunc;

testObj.testFunc();

function sayHello(fn) {
    fn();
    console.log("hello");
}

// sayHello(testObj.testFunc)

