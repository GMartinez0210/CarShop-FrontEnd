// * Importing modules
import React, { useState } from "react"

// * CSS
import "./cartItem.css"

// * Env variable and utilities
import env from "../../env"
import utilities from "../../utilities.js"

// * Components
import TitleSubtitle from "../../components/Title Subtitle/TitleSubtitle"

// * Icons
const minusIcon = "bi bi-dash"
const plusIcon = "bi bi-plus"
const trashIcon = "bi bi-trash"

function CartItem(props) {
    const [quantity, setQuantity] = useState(2)

    function lessQuantity() {
        if(quantity != 0) {
            setQuantity(quantity - 1)
        }
    }

    function addQuantity() {
        setQuantity(quantity + 1)
    }

    return (
        <div className="cart-item">
            <div className="cart-item-img-container">
                <img className="cart-item-img" alt="" 
                    src={env.API_URL+"/api/image/"+props.car.images[0]}/>
            </div>
            <div className="cart-item-info-container">
                <div className="cart-item-info">
                    <TitleSubtitle title={props.car.brand}
                        titleClass={"cart-item-title"} 
                        subtitle={props.car.model} 
                        subtitleClass={"cart-item-subtitle"} /> 
                    <div className="cart-item-price-container">
                        <p className="cart-item-price">Price</p>
                        <p className="cart-item-price-number">
                            {utilities.newPrice(props.car.price)}
                        </p>
                    </div>
                </div>
                <div className="cart-item-subtotal-main-container">
                    <div className="cart-item-quantity-container">
                        <button className="cart-item-less-quantity" 
                            onClick={lessQuantity}>
                            <i className={
                                quantity == 1 
                                ? trashIcon
                                : minusIcon
                            }></i>
                        </button>
                        <div className="cart-item-quantity">
                            {quantity}
                        </div>
                        <button className="cart-item-add-quantity" 
                            onClick={addQuantity}>
                            <i className={plusIcon}></i>
                        </button>
                    </div>
                    <div className="cart-item-subtotal-container">
                        <p className="cart-item-subtotal">Subtotal</p>
                        <p className="cart-item-subtotal-number">
                            {utilities.newPrice(props.car.price * quantity)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem