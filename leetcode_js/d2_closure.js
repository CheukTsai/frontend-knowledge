// Closure Example
function createAdder(a) {
    function f(b) {
        return a + b;
    }
    return f;
}
const var_createAdders = createAdder(3);
console.log(var_createAdders(4));

// You may notice that in the above example createAdder is very similar to a class constructor.

class Adder {
    constructor(a) {
        this.a = a;
    }

    add(b) {
        return this.a + b;
    }
}

const adder = new Adder(2);
console.log(adder.add(4));
console.log("Adder.a:", adder.a);

// One key difference is that closures allow for true encapsulation. In the class example, 
// there is nothing stopping you from writing addTo2.a = 3; and breaking it's expected behavior. 
// However, in the closure example, it is theoretically impossible to access a

function testAdderClosure(a) {
    function f(b) {
        return a + b;
    }
    return f;
}
const var_testAdderClosure = createAdder(3);
// it will 
console.log(var_testAdderClosure.a);

// 另一个区别是函数如何存储在内存中。 如果创建一个类的多个实例，则每个实例都会存储对存储所有方法的原型对象的单个引用。 
// 而对于闭包，每次调用外部函数时，都会生成所有“方法”，并将每个方法的“副本”存储在内存中。 
// 因此，类可以更加高效，特别是在有很多方法的情况下。