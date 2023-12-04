// JavaScript Objects and Function Returns

// In JavaScript, functions can return objects, 
// which are collections of related data and functions, often known as properties and methods.

function createPerson(name, age) {
    return {
        name1: name,
        age1: age,
        greetings: function(){
            console.log(`Hello my name is ${this.name1} and I am ${this.age1} years old`)
        },
        arrow_greetings: () => {
            // will be undefined if using arrow syntax
            console.log(`Hello my name is ${this.name1} and I am ${this.age1} years old`)
        }
    }
}

let var_create_person = createPerson("Tsai", 27);
var_create_person.greetings();
// don't use array syntax in the greetings
var_create_person.arrow_greetings();

// JavaScript Objects and Limited Method Chaining
// In the problem at hand, the expect function returns an object. 
// This object includes the toBe and notToBe methods. 
// Although these methods can be invoked sequentially in a chain-like manner, 
// this represents a restricted form of method chaining as 
// they do not return the original object for further chaining, 
// which is a key characteristic of method chaining in JavaScript programming.

function chainedCreatePerson(name, age) {
    return {
        name1: name,
        age1: age,
        greetings: function(){
            console.log(`Hello my name is ${this.name1} and I am ${this.age1} years old`)
            // 'this' is the object
            // which contains the greetings function
            console.log(this);
            return this;
        }
    }
}
let var_chained_create_person = chainedCreatePerson("Cai", 25);
var_chained_create_person.greetings().greetings();