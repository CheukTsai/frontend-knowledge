function debounce(func, wait, option = {leading: false, trailing: true}) {
    // your code here
    const {leading, trailing} = option;
    let timeout;

    function run(...contextArgs) {
        const _this = this;
        if (timeout === null && leading) {
            func.apply(_this, contextArgs);
            coolingDown();
        }  else if (trailing) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(_this, contextArgs);
            }, wait);
        }
    }

    function coolingDown() {
        timeout = setTimeout(() => {
            timeout = null;
        }, wait);
    }

    return function(...args) {
        run(args);
    }
}







/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
// function debounce(func, wait, option = {leading: false, trailing: true}) {
//     // your code here
//     let timeout;
//     return function(...args) {
//       const _this = this;
//       let isInvoked = timeout == null && option.leading;
//       if (isInvoked) {
//         func.call(_this, ...args);
//       }
  
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         if (option.trailing && !isInvoked) {
//           func.call(_this, ...args);
//         }
//         timeout = null;
//       }, wait);
//     }
// }