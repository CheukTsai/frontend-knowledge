console.log('start')

const fn = () => {
	return new Promise((resolve, reject) => {
		console.log(1)
		resolve(2)
	})
}

console.log(3)

fn().then(res => {
	console.log(res)
})

console.log('end')