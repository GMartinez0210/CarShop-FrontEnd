// * Importing modules
import React, { useEffect, useState } from "react"

import {
    useFetchCartItems
} from "../../middlewares/useFetch"

// * CSS
import "./cart.css"

// * Components
import SmallText from "../../components/Small Text/SmallText"
import CartItem from "../../hooks/Cart Item/CartItem"
import CartPay from "../../components/Cart Pay/CartPay"

function Cart() {
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    async function handleFetchCart() {
        const {cars, totalPrice} = await useFetchCartItems()
        setCartItems(cars)
        setTotalPrice(totalPrice)
    }

    useEffect(() => {
        handleFetchCart()
    }, [])

    return (
        <div className="cart">
            <SmallText spanText={"Let's see your"} aText={"cart"}
                href={"#"} redirect={false} smallClass={"cart-small-text"}/>
        
            <h1 className="car-subtitle">Cart items</h1>

            <div className="cart-item-container">
                {
                    cartItems?.map(cartItem => {
                        return <CartItem car={cartItem} 
                            handleFetchCart={handleFetchCart} />
                    })
                }
            </div>

            {
                totalPrice != 0 &&
                <CartPay totalPrice={totalPrice} />
            }

        </div>
    )
}

export default Cart