async function helper() {
    return "hello";
}

console.log(helper())

helper().then(res => console.log(res))