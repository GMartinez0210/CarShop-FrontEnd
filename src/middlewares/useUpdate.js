// * Importing modules
import axios from "axios"

// * Env variables
const env = import.meta.env

/**
 * It takes a cartItem object, adds the userID to it, and then sends it to the API to update the cart.
 * @param cartItem - {quantity: Number, car: carID}
 * @returns The result of the async function.
 */
async function useUpdateCartQuantity(cartItem) {
    const user = window.localStorage.getItem("userID")

    const url = env.VITE_API_URL+"/api/cart"

    const data = new URLSearchParams()
    data.append("user", user)
    
    for(const key in cartItem) {
        data.append(key, cartItem[key])
    }

    const result = await axios.patch(url, data)
        .then(response => response.data)
        .catch(() => {error: true})

    return result
}

export {
    useUpdateCartQuantity
}