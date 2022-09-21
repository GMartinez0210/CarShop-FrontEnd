// * Importing modules
import React from "react"

// * Importing utilities
import utilities from "../../utilities"

// * CSS
import "./cartPay.css"

function CartPay(props) {
    return (
        <button className="cart-pay">
            <p>Total:</p>
            <p>{utilities.newPrice(props.totalPrice)}</p>
            <div className="cart-pay-decoration">
                <i className="bi bi-cash cart-pay-icon"></i>
                <span>Pay</span>
            </div>
        </button>
    )
}

export default CartPay