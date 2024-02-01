(function main() {
    function Promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// 示例使用
const httpRequest = (url, callback) => {
  // 模拟异步请求
  setTimeout(() => {
    if (url === '/mockURL') {
      callback(null, 'Mock response');
    } else {
        console.log("hello")
        console.log(callback.length);
      callback(new Error('Invalid URL'));
    }
  }, 1000);
};

const PromisifiedHttpRequest = Promisify(httpRequest);

// 使用PromisifiedHttpRequest
PromisifiedHttpRequest('/mkURL')
  .then((response) => {
    console.log(response); // 输出: "Mock response"
  })
  .catch((error) => {
    console.error(error); // 输出: 无错误
  });
}());