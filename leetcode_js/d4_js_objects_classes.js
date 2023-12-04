// Objects
// just mappings from strings to other values. 
// The values can be anything: strings, functions, other objects, etc.
// The string that maps to the value is called the key.

const object = {
    num: 1,
    "str": "two",
    f: function() {
        return 1;
    },
    obj: {
        ".name": "name"
    }
}

// Three ways to access values on an object

// 1. Dot notation
console.log(object.str)

// 2. Bracket Notation
// This is used when the key isn't valid variable name. For example ".123".

console.log(object["obj"][".name"])
// this will not work
console.log(object.obj.name)

// Destructuring Syntax. 
// This is most useful when accessing multiple values at once. 

const {num, str, name} = object;
console.log(num, str, name);


// Classes and Prototypes
// The classes's constructor returns an object which is an instance of that class.

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`)
    }
}

const Tsai = new Person("Tsai", 27);
Tsai.greet();

// JavaScript implements classes with special objects call prototypes. 
// All the methods (in this case greet) are functions stored on the object's prototype.

const proto = {
    type: "student",
    greet: function() {
        console.log("My name is", this.name);
    }
};

const alice = {
    name: "Alice",
    age: 25,
    __proto__: proto
  };
alice.greet();
console.log(alice.__proto__);
console.log(alice.type);
console.log(alice.hasOwnProperty("name"));
console.log(alice.hasOwnProperty("type"));