// array reduce

let nums = [1,2,3,4,5];

console.log(nums.reduce((a, val) => a + val, 0)); 

console.log(nums.reduce((a, val) => Math.max(a, val), Number.MIN_SAFE_INTEGER));


// object reduce

const groceries = [
    { id: 173, name: "Soup" }, 
    { id: 964, name: "Apple" },
    { id: 535, name: "Cheese" }
  ];
  
  const indexedGroceries = groceries.reduce((accumulator, val) => {
    accumulator[val.id] = val;
    return accumulator;
  }, {});
  
  console.log(indexedGroceries);

  var names = groceries.reduce((accumulator, val) => {
    if (val.id > 500) {
      accumulator.push(val.name);
    }
    return accumulator;
  }, []);

  console.log(names);
  names = [];
  groceries.forEach((val) => {
    if (val.id > 500) {
        names.push(val.name);
    }
  });
  console.log(names);