// * Importing modules
import axios from "axios"

// * Env variables
const env = import.meta.env

/**
 * It deletes a car from a user's cart.
 * @param car - the car ID
 * @returns The result of the axios.delete() call.
 */
async function useDeleteCartItem(car) {
    const user = window.localStorage.getItem("userID")

    const url = env.VITE_API_URL+"/api/cart"

    const data = new URLSearchParams()
    data.append("user", user)
    data.append("car", car)

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data
    }

    const result = await axios.delete(url, config)
        .then(response => response.data)
        .catch(() => {error: true})

    return result
}

export {
    useDeleteCartItem
}