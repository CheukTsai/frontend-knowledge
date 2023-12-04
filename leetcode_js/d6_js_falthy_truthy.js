function check(obj) {
    console.log("======");
    const output = obj ? "true" : "false";
    console.log(`Input: ${JSON.stringify(obj)} Output: ${output}`);
}


let obj = {};
check(obj);
check(obj.key);
obj = [];
check(obj);
obj = undefined;
check(obj);
obj = null;
check(obj);
obj = true;
check(!!obj);
check(!obj);

// Truthiness and Logical Operators

function logicalOperator(obj) {
    console.log("======");
    const str = obj || "Obj is falthy"
    console.log(`Input: ${JSON.stringify(obj)} Output: ${JSON.stringify(str)} `);
}

obj = {};
logicalOperator(obj);

let a = null, b = null, c = "c";
console.log(a || b || c);

a = null; b = "b"; c = "c";
console.log(a || b || c);