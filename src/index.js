(async() => {
    const hello = await new Promise(resolve => setTimeout(() => resolve('hello world'), 1000))
    console.log(hello)
})()