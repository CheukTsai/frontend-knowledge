class EventEmitter {
    events = {};
    constructor() {
        
    }

    on(event, callback) {
        let callbacks = this.events[event] || [];
        callbacks.push(callback);

        this.events[event] = callbacks;
        return this;
    }

    off(event, callback) {
        let callbacks = this.events[event];
        this.events[event] = callbacks && callbacks.filter(fn => fn !== callback);

        return this;
    }

    emit(event, ...args) {
        let callbacks = this.events[event];
        callbacks.forEach(fn => {
            fn(...args);
        });
        return this;
    }

    once(event, callback) {
        let wrapFun = (...args) => {
            callback(...args);

            this.off(event, wrapFun);
        }

        this.on(event, wrapFun);

        return this;
    }
}

// Create an instance of the EventEmitter
const emitter = new EventEmitter();

// Register event listeners
function myListener1(arg1, arg2) {
    console.log(`Listener 1: Event fired with args ${arg1} and ${arg2}`);
}

function myListener2(arg1, arg2) {
    console.log(`Listener 2: Event fired with args ${arg1} and ${arg2}`);
}

emitter.on('myEvent', myListener1);
emitter.on('myEvent', myListener2);

// Emit the event
console.log("Emitting 'myEvent'");
emitter.emit('myEvent', 'arg1', 'arg2');

// Remove one of the event listeners
console.log("Removing 'myListener1'");
emitter.off('myEvent', myListener1);

// Emit the event again
console.log("Emitting 'myEvent' again");
emitter.emit('myEvent', 'arg1', 'arg2');

// Register a one-time event listener
console.log("Registering a one-time listener");
function oneTimeListener(arg1, arg2) {
    console.log(`One-time listener: Event fired with args ${arg1} and ${arg2}`);
}
emitter.once('myEvent', oneTimeListener);

// Emit the event to trigger the one-time listener
console.log("Emitting 'myEvent' to trigger the one-time listener");
emitter.emit('myEvent', 'arg1', 'arg2');

// Emit the event again to show the one-time listener was removed
console.log("Emitting 'myEvent' again to show the one-time listener was removed");
emitter.emit('myEvent', 'arg1', 'arg2');