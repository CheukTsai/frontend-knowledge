// ES6: import "..." ; ES5: require("....")

// typeof 
console.log("type of 19 is: ")
console.log(typeof 19);

// string
console.log();
console.log("========== string ==========");
console.log();

let s = "0123456789";
s.slice(1,5);
console.log("s.slice(1, 5):", s.slice(1, 5));
console.log("s.slice(5, 1):", s.slice(5, 1));
console.log("s.slice(-1):", s.slice(-1));
console.log("s.substring(1, 5):", s.substring(1, 5));
console.log("s.substring(5, 1):", s.substring(5, 1));
console.log("s.substr(1,5):", s.substr(1,5));


// array
console.log();
console.log("========== array ==========");
console.log();

let arr = [];
arr.push(1);
arr.push(2);
arr.push(3);
console.log(arr);

let arrTmp1 = arr.pop();
console.log("pop:", arr);
console.log(arrTmp1);

arr.unshift(4, 5, 6);
console.log("unshift 4 5 6:", arr);

arrTmp1 = arr.shift();
console.log("shift", arr);
console.log(arrTmp1);

arr = [1,2,3,4,5]
arr.splice(3)
console.log("[1,2,3,4,5].splice(3):", arr);

arr = [1,2,3,4,5]
arr.splice(0, 2)
console.log("[1,2,3,4,5].splice(0, 2):", arr);

arr = [1,2,3,4,5]
arr.splice(1, 2, 6, 7, 8)
console.log("[1,2,3,4,5].splice(1, 2, 6, 7, 8):", arr);

arr = [1,2,3,4,5]
arr.splice(1, 2, [6, 7], 8)
console.log("[1,2,3,4,5].splice(1, 2, [6, 7], 8):", arr);

arr = [1,2,3,4,5]
let arr2 = arr.slice();
console.log("arr.slice()", arr2);

arr.concat(0, 6, 7);
console.log("arr.concat(0, 6, 7)", arr.concat(0, 6, 7));

arr = [1,2,3,4,5]
console.log("arr.includes(0):", arr.includes(0));
console.log("arr.includes(1):", arr.includes(1));

arr = [{id: 1, key: "random"}, {id: 2, key: "random"}, {id: 3, key: "not-random"}]
let a = arr.find(x => x.id === 1);
console.log(a);
a = arr.find(x => x.id === 4);
console.log(a);
a = arr.findIndex(x => x.id === 1);
console.log(a);
a = arr.filter(x => x.key === "random");
console.log(a);
a = arr.filter(x => x.key === "not exist");
console.log(a);
a = arr.map(x => x.id + 1);
console.log(a);
a = arr.forEach(x => console.log("the id is:", x.id));
arr.sort((a, b) => b.id - a.id);
console.log(arr);
const person = {name: "Bob", age: 12, sex: "Male"};
const{name, sex} = person;
console.log(name);
console.log({address: "123 street", ...person});

// default arguments
function fn(n = 10000) {
    console.log(n);
}
fn();

console.log();

for (key in person) {
    console.log(key, ":", person[key]);
}

console.log();

let nonenum = {value: "random", other: "hey"};
Object.defineProperty(nonenum, 'value', {
    enumerable: false,
})
for (key in nonenum) {
    console.log(key, ":", nonenum[key]);
}

s = "123456";

for (ch in s) {
    console.log("idx:", ch);
}

for (ch of s) {
    console.log("element:", ch);
}

arr = [1,2,3,4,5]

let obj = {name: "a", type: "b"}

for (let k in arr) {
    console.log(k);
}

for (let k in obj) {
    console.log(obj[k]);
}
