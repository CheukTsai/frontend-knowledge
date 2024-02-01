function throttle(func, wait, option = { leading: true, trailing: true }) {
    const {leading, trailing} = option;
    let timeout;
    let contextArgs = null;

    function run() {
        const _this = this;
        if (timeout == null && leading) {
            func.apply(_this, contextArgs);
            contextArgs = null;
            coolingDown();
        } else {
            
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(_this, contextArgs);
                contextArgs = null;
                timeout = null;
            }, wait);
        } 
    }

    function coolingDown() {
        timeout = setTimeout(() => {
            timeout = null;
        }, wait);
        if (contextArgs && trailing) run();
    }

    return function(...args) {
        contextArgs = args;
        run();
    }     
}


function throttle(func, wait, option = { leading: true, trailing: true }) {
    const { leading, trailing } = option;
    let lastArgs = null;
    let timeout;
  
    function delay() {
      if (lastArgs && trailing) {
        func.apply(this, lastArgs);
        lastArgs = null;
        timeout = setTimeout(delay, wait);
      } else {
        timeout = null;
      }
    };
  
    return function (...args) {
      lastArgs = args;
      if (!timeout) {
        if (leading) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
        timeout = setTimeout(delay, wait);
      } 
    }
  }