// * Importing modules
import { useEffect, useState } from "react"

// * Enviromental variables and Utilities
import env from "../../env"
import utilities from "../../utilities"

// * CSS
import "./carView.css"

// * Component
import Slider from "../Slider/Slider"

// * Imported icons
import motorIcon from "../../assets/Car View/motor.svg"
import carSeatIcon from "../../assets/Car View/car-seat.svg"
import axios from "axios"

// * Icons
const chevronLeft = "bi bi-chevron-left"
const searchIcon = "bi bi-search"
const heartFill = "bi bi-suit-heart-fill"
const minusIcon = "bi bi-dash"
const plusIcon = "bi bi-plus"
const gearIcon = "bi bi-gear"
const cartIcon = "bi bi-cart"

function CarView(props) {
    const [isThere, setThere] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [isFavorite, setFavorite] = useState(false)

    function lessQuantity() {
        if(quantity != 0) {
            setQuantity(quantity - 1)
        }
    }

    function addQuantity() {
        setQuantity(quantity + 1)
    }

    async function handleFavoriteTap() {
        setFavorite(!isFavorite)

        const values = {
            user: window.localStorage.getItem("userID"),
            car: props.car._id
        }

        let options = {
            url: env.API_URL+"/api/favorite",
            data: utilities.params(["user", "car"], values),
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }

        if(isFavorite) {
            alert("Delete")

            options["method"] = "delete"

            const result = await axios(options)
                .then(response => response.data)
                .catch(() => null)
                
            if(!result) {
                alert("An error occured")
                setFavorite(false)
                return
            }

            return
        }
        
        alert("Post")

        options["method"] = "post"

        const result = await axios(options)
            .then(response => response.data)
            .catch(() => null)
            
        if(!result) {
            alert("An error occured")
            setFavorite(false)
            return
        }

        return
    }

    async function handleCheckingFavorite() {
        const user = window.localStorage.getItem("userID")
        const options = `?user=${user}` 

        const favorites = await axios.get(env.API_URL+"/api/favorite"+options)
            .then(({data}) => data.favorites)
            .catch(() => null)

        if(favorites == null) return

        if(favorites.car.length == 0) return

        const favorite = favorites.car.some(item => item == props.car._id)

        if(!favorite) return

        setFavorite(favorite)
    }

    function handleShown() {
        setThere(true)
    }

    useEffect(() => {
        handleCheckingFavorite()
    },[])

    return (
        <div onLoad={handleShown} className={`car-view-container ${isThere && "shown"}`}>
            <section className="car-view-img-container">
                <div>
                    <Slider key={"Car-View-Slider"} id={"car-view-images"} images={props.car.images} />
                </div>
                <button className="car-view-back" onClick={props.hideCarView}>
                    <i className={chevronLeft}></i>
                </button>
                <div className="car-view-search">
                    <i className={searchIcon}></i>
                </div>
            </section>
            <section className="car-view-info-container">
                <div className={`car-view-favorite ${isFavorite ? "active" : ""}`} 
                    onClick={handleFavoriteTap}>
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

export default CarView