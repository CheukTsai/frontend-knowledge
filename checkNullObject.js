function checkNullObject(obj) {
    return Object.keys(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0;
}

function testCheckNullObject() {
    // Test with various objects
    const emptyObject = {};
    const nonEmptyObject = { key: 'value' };
    const objectWithSymbols = { [Symbol('symbolKey')]: 'symbolValue' };
    
    console.log(checkNullObject(emptyObject)); // Should print true
    console.log(checkNullObject(nonEmptyObject)); // Should print false
    console.log(checkNullObject(objectWithSymbols)); // Should print false
}

// Run the tests for checkNullObject
testCheckNullObject()