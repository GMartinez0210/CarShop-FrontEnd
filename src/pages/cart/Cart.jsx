// * Importing modules
import React from "react"

// * CSS
import "./cart.css"

// * Components
import SmallText from "../../components/Small Text/SmallText"
import CartItem from "../../hooks/Cart Item/CartItem"

const car = {
    "_id": "63017743aad6d614db0df4d5",
    "brand": "Bugatti",
    "model": "Veyron Grand Sport",
    "engine": "V8 Squad Turbo",
    "gears": "Automatic",
    "seats": 2,
    "__v": 0,
    "user": "62f5746caedb824f606813fe",
    "licensePlate": "A4S5D6",
    "images": [
        "1661040451696-114369074-Bugatti Veyron Grand Sport (front).jpeg",
        "1661040451701-394214923-Bugatti Veyron Grand Sport (profile).jpeg"
    ],
    "price": 2200000,
    "about": "The Bugatti Veyron EB 16.4 is a mid-engine sports car, designed and developed in France by the Volkswagen Group and Bugatti and manufactured in Molsheim, France, by French automobile manufacturer Bugatti. It was named after the racing driver Pierre Veyron."
}

function Cart() {
    return (
        <div className="cart">
            <SmallText spanText={"Let's see your"} aText={"cart"}
                href={"#"} redirect={false} smallClass={"cart-small-text"}/>
        
            <h1 className="car-subtitle">Cart items</h1>

            <CartItem car={car} />
        </div>
    )
}

export default Cart