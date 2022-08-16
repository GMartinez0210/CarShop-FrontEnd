// * Importing modules
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

// * CSS
import "./carView.css"

// * Component
import Slider from "../Slider/Slider"

// * Imported icons
import motorIcon from "../../assets/Car View/motor.svg"
import carSeatIcon from "../../assets/Car View/car-seat.svg"

// * Icons
const chevronLeft = "bi bi-chevron-left"
const searchIcon = "bi bi-search"
const heartFill = "bi bi-suit-heart-fill"
const minusIcon = "bi bi-dash"
const plusIcon = "bi bi-plus"
const gearIcon = "bi bi-gear"
const cartIcon = "bi bi-cart"

function CarView(props) {
    const [quantity, setQuantity] = useState(0)

    function lessQuantity() {
        if(quantity != 0) {
            setQuantity(quantity - 1)
        }
    }

    function addQuantity() {
        setQuantity(quantity + 1)
    }

    function View(car) {
        if(car == null) return

        return (
            <div className={`car-view-container ${car != null && "shown"}`}>
                <section className="car-view-img-container">
                    <div>
                        <Slider id={"car-view-images"} images={props.car.images} />
                    </div>
                    <button className="car-view-back" onClick={props.hideCarView}>
                        <i className={chevronLeft}></i>
                    </button>
                    <div className="car-view-search">
                        <i className={searchIcon}></i>
                    </div>
                </section>
                <section className="car-view-info-container">
                    <div className="car-view-favorite">
                        <i className={heartFill}></i>
                    </div>
                    <div className="car-view-info">
                        <header className="car-view-header">
                            <h1 className="car-view-header-title">{props.car.brand} {props.car.model}</h1>
                            <div className="car-view-number">
                                <div className="car-view-quantity-container">
                                    <button className="car-view-less-quantity" 
                                        onClick={lessQuantity}>
                                        <i className={minusIcon}></i>
                                    </button>
                                    <div className="car-view-quantity">
                                        {quantity}
                                    </div>
                                    <button className="car-view-add-quantity" 
                                        onClick={addQuantity}>
                                        <i className={plusIcon}></i>
                                    </button>
                                </div>
                                <span className="car-view-price">{props.price}</span>
                            </div>
                        </header>
                        <main>
                            <section className="car-view-about-container">
                                <h2 className="car-view-about">About</h2>
                                <p className="car-view-about-text">{props.car.about}</p>
                            </section>
                            <section className="car-view-icon-main-container">
                                <div className="car-view-icon-container">
                                    <button className="car-view-icon">
                                        <img src={motorIcon} alt=""/>
                                    </button>
                                    <div className="car-view-icon-info">
                                        <p>Engine</p>
                                        <small>{props.car.engine}</small>
                                    </div>
                                </div>
                                <div className="car-view-icon-container">
                                    <button className="car-view-icon">
                                        <i className={gearIcon}></i>
                                    </button>
                                    <div className="car-view-icon-info">
                                        <p>Gears</p>
                                        <small>{props.car.gears}</small>
                                    </div>
                                </div>
                                <div className="car-view-icon-container">
                                    <button className="car-view-icon">
                                        <img src={carSeatIcon} alt=""/>
                                    </button>
                                    <div className="car-view-icon-info">
                                        <p>Seats</p>
                                        <small>{props.car.seats}</small>
                                    </div>
                                </div>
                            </section>
                        </main>
                        <footer className="car-view-footer">
                            <button className="car-view-icon">
                                <i className={cartIcon}></i>
                            </button>
                            <button className="car-view-buy">
                                Buy now
                            </button>
                        </footer>
                    </div>
                </section>
            </div>
        )
    }

    useEffect(() => {
        setQuantity(0)
    }, [props.shownCarView])

    return (
        <div>
            {props.shownCarView && View(props.car)}
        </div>
    )
}

export default CarView