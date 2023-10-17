const mySymbol = Symbol('privateSymbol');

class MyClass {
    constructor() {
        this[mySymbol] = 'privateValue';
    }

    getPrivateValue() {
        return this[mySymbol];
    }
}

const instance = new MyClass();
console.log(instance.getPrivateValue()); // 'privateValue'
console.log(instance[mySymbol]); // Cannot access it directly
