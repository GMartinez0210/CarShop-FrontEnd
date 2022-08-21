// * Importing modules
import { useEffect, useState } from "react"

// * CSS
import "./navIcon.css"

function NavIcon(props) {
    const [active, setActive] = useState(props.getPage())

    const home = "bi bi-house-door"
    const homeFill = "bi bi-house-door-fill"
    
    const favorite = "bi bi-heart"
    const favoriteFill = "bi bi-heart-fill"
    
    const cart = "bi bi-cart"
    const cartFill = "bi bi-cart-fill"
    
    const account = "bi bi-person"
    const accountFill = "bi bi-person-fill"
    
    const arrayIcon = [home, favorite, cart, account]
    const arrayIconFill = [homeFill, favoriteFill, cartFill, accountFill]

    function onClickLink(event) {
        event.preventDefault()
        const key = event.target.ariaLabel
        setActive(key)
    }

    useEffect(() => {
        props.setPage(active)
        props.setSomething(false)
    }, [active])

    return (
        <>
            {
                props.arrayAriaLabel.map((item, index) => {
                    const iconClass = active == item
                        ? `${arrayIconFill[index]} nav-icon-fill`
                        : `${arrayIcon[index]} nav-icon`

                    return (
                        <li key={"Nav-Icon-"+index} className="nav-item">
                            <a className="nav-link" href="#"
                                onClick={onClickLink}>
                            <i className={iconClass} aria-label={item}></i>
                            </a>
                        </li>
                    )
                })
            }
        </>
    )
}

export default NavIcon