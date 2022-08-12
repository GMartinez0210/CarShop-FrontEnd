// * Importing modules
import { useEffect, useRef, useState } from "react"

// * CSS
import "./nav.css"

// * Components
import NavIcon from "../../components/Nav Icon/NavIcon"

function Nav(props) {
    const home = "bi bi-house-door"
    const homeFill = "bi bi-house-door-fill"
    const [homeActive, setHomeActive] = useState(true)
    
    const favorite = "bi bi-heart"
    const favoriteFill = "bi bi-heart-fill"
    const [favoriteActive, setFavoriteActive] = useState(false)
    
    const cart = "bi bi-cart"
    const cartFill = "bi bi-cart-fill"
    const [cartActive, setCartActive] = useState(false)
    
    const account = "bi bi-person"
    const accountFill = "bi bi-person-fill"
    const [accountActive, setAccountActive] = useState(false)
    
    const upload = "bi bi-shift"
    const uploadFill = "bi bi-shift-fill"
    const [uploadActive, setUploadActive] = useState(false)

    const arrayIcon = [home, favorite, cart, account]
    const arrayIconFill = [homeFill, favoriteFill, cartFill, accountFill]
    const arrayActive = [homeActive, favoriteActive, cartActive, accountActive]
    const arraySetActive = [setHomeActive, setFavoriteActive, setCartActive, setAccountActive]
    const arrayAriaLabel = ["Home", "Favorite", "Cart", "Account"]

    function handleEffect() {
        arraySetActive.forEach(setActive => {
            setActive(false)
        })
    }

    // TODO Refactor and fix the navigation bar component 
    // TODO which isn't working correctly

    return (
        <nav className="container-fluid position-fixed bottom-0 home-navbar-container">
            <div className="home-navbar">
                <div className="home-navbar-upload">
                    {
                        uploadActive
                        ? <i className={`${uploadFill} upload-icon`}></i>
                        : <i className={`${upload} upload-icon`}></i>
                    }
                </div>
                <ul className="home-navbar-icons">
                    {
                        arrayIcon.map((icon, index) => {
                            return <NavIcon key={`NavIcon-${index}`} icon={icon}
                                iconFill={arrayIconFill[index]} 
                                ariaLabel={arrayAriaLabel[index]} 
                                active={arrayActive[index]}
                                setActive={arraySetActive[index]} 
                                currentPage={props.currentPage} 
                                handleEffect={handleEffect}/>
                        })
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Nav