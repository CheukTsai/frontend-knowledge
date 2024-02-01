Function.prototype.myApply = function(thisArg, argArray) {
    console.log(this.prototype);
}

function multiplyAge(multiplier = 1) {
    return this.age * multiplier;
  }
  
  const mary = {
    age: 21,
  };
  
  const john = {
    age: 42,
  };
  
  multiplyAge.myApply(mary); // 21
  multiplyAge.myApply(john, [2]); // 84