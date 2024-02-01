const data = {};
let name = "张三";

Object.defineProperty(data,'name',{
    get:function(){
        console.log('触发get')
        return name
    },
    set:function(newVal){
        console.log('触发set')
        name=newVal
    }
})

//测试
console.log(data.name)   // 触发get  张三
data.name = '李四'         // 触发set