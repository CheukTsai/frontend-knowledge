function numberOfArguments(...args) {
  
    const func = () => {
      console.log(this);
    }
  
    func();
}

let obj = {
    hello: "hello",
    function: numberOfArguments
}

obj.function();