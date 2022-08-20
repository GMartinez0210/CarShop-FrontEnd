/**
 * It takes an array of parameters and an object of values and returns a string of parameters and
 * values
 * @param params - an array of the keys of the values 
 * @param values - an object of the values you want to send
 * @returns A function that takes two parameters, params and values.
 */
function params (params, values) {
    let data = ""
    params.forEach((param, index) => {
        if(index == params.length - 1) data += `${param}=${values[param]}`
        else data += `${param}=${values[param]}&`
    })
    return data  
}

/**
 * If the value is greater than or equal to 1 million, return the value divided by 1 million with the
 * letter M appended to it. If the value is greater than or equal to 1 thousand, return the value
 * divided by 1 thousand with the letter K appended to it.
 * @param value - The value of the cell.
 * @returns A function that takes a value and returns a string.
 */
function newPrice(value) {
    if(value >= Math.pow(10,6)) return `$ ${value/Math.pow(10,6)} M`
    if(value >= Math.pow(10,3)) return `$ ${value/Math.pow(10,3)} K`
}

export default { params, newPrice }
