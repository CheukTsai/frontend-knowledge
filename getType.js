function getType(value) {
    if (value === null) {
        return value + "";
    }

    if (typeof value === "object") {
        let valueClass = Object.prototype.toString.call(value);
        
        type = valueClass.split(" ")[1].split("");
   
        type.pop();
        return type.join("").toLowerCase();
    } else {
        return typeof value;
    }
}

class TestClass {
    constructor() {
        this.property1 = 'Hello';
        this.property2 = 42;
    }

    method1() {
        return 'World';
    }
}

const testObject = new TestClass();
const result = getType(testObject);
console.log(result); 

function testTypeExtraction() {
    // Test with various values
    const testCases = [
        { value: null, expectedType: 'null' },
        { value: 42, expectedType: 'number' },
        { value: "Hello, World!", expectedType: 'string' },
        { value: true, expectedType: 'boolean' },
        { value: [], expectedType: 'array' },
        { value: {}, expectedType: 'object' },
        { value: new Date(), expectedType: 'date' },
        { value: /regex/, expectedType: 'regexp' },
        { value: function() {}, expectedType: 'function' },
    ];

    for (const testCase of testCases) {
        const valueClass = Object.prototype.toString.call(testCase.value);
        const type = valueClass.split(" ")[1].split("");
        type.pop();
        const formattedType = type.join("").toLowerCase();

        if (formattedType === testCase.expectedType) {
            console.log(`Test passed for ${testCase.value}: ${formattedType}`);
        } else {
            console.error(`Test failed for ${testCase.value}: Expected ${testCase.expectedType}, got ${formattedType}`);
        }
    }
}

// Run the tests for type extraction
testTypeExtraction();