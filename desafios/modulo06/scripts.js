async function calculate(number, sum) {
    
    result = new Promise(resolve => {
        setTimeout(() => {
            resolve((number * 2))
        }, Math.floor(Math.random() * 100) + 1)
    }) 

    result = await result + sum

    return result
}

async function printAll() {
    let result = 0
    result = await calculate(5, result)
    result = await calculate(12, result)
    result = await calculate(2, result)

    console.log(result)
}

printAll()