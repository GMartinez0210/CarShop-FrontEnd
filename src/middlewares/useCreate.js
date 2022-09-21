// * Modules
import axios from "axios"

// * Env variables
const env = import.meta.env

/**
 * This function takes a car and adds it to the cart of the user.
 * @param car - the car's ID
 * @returns The result of the function.
 */
async function useCreateCartAdded(params) {
    const user = window.localStorage.getItem("userID")
    const url = env.VITE_API_URL+"/api/cart"

    const data = new URLSearchParams()
    data.append("user", user)

    for(const key in params) {
        data.append(key, params[key])
    }

    const result = await axios.post(url, data)
        .then(response => response.data)
        .catch(() => {error: true})

    return result
}

export {
    useCreateCartAdded
}