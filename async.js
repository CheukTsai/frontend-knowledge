console.log('script start') 
async function async1() { 
   await async2() 
   await async4() 
   console.log('async1 end')
} 
async function async2() { 
   console.log('async2 end') 
} 

async function async4() { 
    console.log('async4 end') 
 } 

async1() 
setTimeout(function() { 
   console.log('setTimeout') 
}, 0)
new Promise(resolve =>{
  console.log('Promise')
  resolve()
}).then(function(){
  console.log('Promise1')
})
console.log('script end') 
