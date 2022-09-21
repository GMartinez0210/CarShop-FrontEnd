async function onSubmitSearch(values) {
    const {search} = values

    const words = search.trim().split(" ")

    const brand = words.length == 1 
        ? words[0] : words.shift()
    
    const model = words.length > 1 
        ? words.reduce((total, value) => `${total} ${value}`) 
        : undefined

    await searchCar(brand, model)
}

export default { onSubmitSearch }