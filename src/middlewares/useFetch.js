// * Modules
import axios from "axios"

// * Env variables
const env = import.meta.env

/**
 * This function will return the user data from the database if the user is logged in, otherwise it
 * will return null.
 * @returns The user object.
 */
export async function useFetchUserData() {
    const _id = window.localStorage.getItem("userID")
    const user = await axios.get(env.VITE_API_URL+"/api/user"+`?_id=${_id}`)
        .then(({data}) => {
            const { user } = data
            return user
        })
        .catch(() => null)

    return user
}

/**
 * It fetches a list of cars from an API and returns the list of cars.
 * @returns An array of objects.
 */
export async function useFetchCars() {
    const carArray = await axios.get(env.VITE_API_URL+"/api/cars")
    .then(response => response.data)
    .catch(error => {
        console.log(error)
        return null
    })

    if(!carArray) return null

    const {cars} = carArray

    if(!cars) return null

    return cars
}

/**
 * It fetches a list of car brands from an API and returns them as an array.
 * @returns An array of objects.
 */
export async function useFetchBrands() {
    const brandArray = await axios.get(env.VITE_API_URL+"/api/brand")
        .then(response => response.data)
        .catch(error => {
            console.log(error)
            return null
        })

    if(brandArray == null) return null

    const {brands} = brandArray

    if(brands == null) return null

    return brands.map(brand => brand.name)
}

/**
 * It fetches a car from the database based on the brand and model.
 * @param brand - "Recomended"
 * @param model - "",
 * @returns An array of objects.
 */
export async function useFetchSearchedCar(brand, model) {
    const options = `?brand=${brand}&model=${model}` 

    const carArray = await axios.get(env.VITE_API_URL+"/api/search"+options)
    .then(response => response.data)
    .catch(error => {
        console.log(error)
        return null
    })

    if(carArray == null) return

    const {cars} = carArray

    if(cars == null) return

    return cars
}

/**
 * It takes a brand as a parameter, and returns an array of cars that match that brand.
 * @param brand - string
 * @returns An array of objects.
 */
export async function useFetchSearchedCarByBrand(brand) {
    const options = `?brand=${brand}` 

    const carArray = await axios.get(env.VITE_API_URL+"/api/search/brand"+options)
    .then(response => response.data)
    .catch(error => {
        console.log(error)
        return null
    })

    if(carArray == null) return

    const {cars} = carArray

    if(cars == null) return

    return cars
}

/**
 * It fetches a car from the database and returns it.
 * @param target - the target of the event
 * @returns The car object.
 */
export async function useFetchCarView(target) {
    const _id = target.id

    const carInfo = await axios.get(env.VITE_API_URL+`/api/car?_id=${_id}`)
        .then(response => response.data)
        .catch(() => null)

    if(!carInfo) return null

    const {car} = carInfo

    if(!car) return null

    return car
}

/**
 * It takes the user's ID from localStorage, then it gets the user's favorites from the database, then
 * it gets the cars from the database that are in the user's favorites, then it returns the cars.
 * @returns An array of objects.
 */
export async function useFetchFavoritesCar() {
    const user = window.localStorage.getItem("userID")
    
    const {favorites} = await axios.get(env.VITE_API_URL+"/api/favorite"+`?user=${user}`)
        .then(response => response.data)
        .catch(() => null)

    if(!favorites) return null
    
    const {car: carFav} = favorites

    let options = ""

    carFav.forEach((car, index) => {
        options += index == carFav.length - 1
            ? `_id=${car}`
            : `_id=${car}&`
    })

    const carArray = await axios.get(env.VITE_API_URL+"/api/cars?"+options)
        .then(response => response.data)
        .catch(() => null) 

    if(!carArray) return null

    const {cars} = carArray

    return cars
}

/**
 * It fetches the cart items from the database and returns them
 * @returns An array of objects.
 */
export async function useFetchCartItems() {
    const user = window.localStorage.getItem("userID")
    const url = env.VITE_API_URL

    const cartOptions = {
        params: {
            user
        }
    }

    const carts = await axios.get(url+"/api/cart", cartOptions)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
            return error.response.data
        })


    return carts
}