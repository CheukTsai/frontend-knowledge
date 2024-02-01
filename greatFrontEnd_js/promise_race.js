/**
 * @param {Array} iterable
 * @return {Promise}
 */

function promiseRace(iterable) {
    return new Promise((resolve, reject) => {
      if (iterable.length === 0) return;
  
      iterable.forEach(async(item) => {
        try {
          const result = await item;
          resolve(result);
        } catch (err) {
          reject(err);
        }
      })
    })
  }

async function test() {
    const p0 = new Promise((resolve) => {
        setTimeout(() => {
          resolve(42);
        }, 100);
      });
      const p1 = new Promise((resolve) => {
        setTimeout(() => {
          resolve(41);
        }, 99);
      });
      
      const result = await promiseRace([p0, p1]); 
      console.log(result); 
}

test().catch(err => {
    console.log(err);
})