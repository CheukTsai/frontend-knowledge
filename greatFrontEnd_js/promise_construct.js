function tryPromise(success, ...args) {
    return new Promise((resolve, reject) => {
        if (success) {
            resolve(...args)
        } else {
            reject("Err");
        }
    })
}

let promise = tryPromise(true, "hello");
promise.then((res) => {console.log(res)}).catch((err) => console.log(err));
promise = tryPromise(false, "hello");
promise.then((res) => {console.log(res)}).catch((err) => console.log(err));


class MyPromise {
    constructor(executor) {
        this.status = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value) => {
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach((callback) => callback(value));
            }
        }
    
        const reject = (reason) => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.reason = reason;
                this.onRejectedCallbacks.forEach((callback) => callback(reason));
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
        return this;
    }

    then = (onFulfilled, onRejected) => {
        if (this.status === 'fulfilled') {
            onFulfilled(this.value);
        } else if (this.status === 'rejected') {
            onRejected(this.reason);
        } else {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
    
        return this;
    }

    catch(onRejected) {
        if (this.status === 'rejected') {
            onRejected(this.reason);
        } else {
            this.onRejectedCallbacks.push(onRejected);
        }

        return this;
    }
}

const myPromise = new MyPromise((resolve, reject) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      // Simulate a successful operation
      resolve("Operation successful");
      // Uncomment the line below to simulate a failed operation
      // reject(new Error("Operation failed"));
    }, 1000);
  });
  
  myPromise
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });