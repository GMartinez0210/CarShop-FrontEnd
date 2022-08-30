// * Modules
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// * CSS
import "./menu.css"

// * Hooks
import MenuItem from "../../hooks/Menu Item/MenuItem"

/*
* With bootstrap
function Menu(props) {
    const items = ["All posts", "My posts", "Chat", "Setting"]
    return (
        <nav>
            <button className="menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target={"#"+props.offNavBar} aria-controls={props.offNavBar}>
                <i className="bi bi-text-left"></i>
            </button>
            <div className="offcanvas offcanvas-start menu-off-nav" tabIndex="-1" id={props.offNavBar} aria-labelledby={props.offNavBarLabel}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id={props.offNavBarLabel}>{props.offTitle}</h5>
                    <button type="button" className="menu-btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                        <i className="bi bi-x"></i>
                    </button>
                </div>
                <div className="offcanvas-body">
                    <MenuItem items={items}/>
                </div>
            </div>
        </nav>
    )
}
*/

const openDoorIcon = "bi bi-door-open"
function Menu(props) {
    let navigate = useNavigate()

    const [menuActive, setMenuActive] = useState()
    
    const items = ["All posts", "My posts", "Chat", "Setting"]

    function handleClickMenu() {
        setMenuActive(!menuActive)
    }

    function handleClickSingOut(event) {
        event.preventDefault()

        window.localStorage.removeItem("userID")

        navigate("/login", {replace: true})
    }

    return (
        <nav className="menu-off-canvas-container">
            <button className="menu-btn" type="button" 
                onClick={handleClickMenu}>
                <i className="bi bi-text-left"></i>
            </button>
            <div className={`menu-off-canvas-main${menuActive ? " active" : ""}`}>
                <button className={`menu-btn-close${menuActive ? " active" : ""}`} 
                    type="button" onClick={handleClickMenu}>
                    <i className="bi bi-x"></i>
                </button>
                <div className="menu-off-canvas-header">
                    <h5 className="menu-off-canvas-title">{props.offTitle}</h5>
                </div>

                <hr className="menu-off-canvas-line"></hr>
                
                <MenuItem items={items}/>
                
                <hr className="menu-off-canvas-line"></hr>

                <div className="menu-off-canvas-footer">
                    <ul>
                        <li className="menu-off-canvas-singout">
                            <a className="menu-off-canvas-link" 
                                href="/singout" 
                                onClick={handleClickSingOut}>
                                <div>
                                    <i className={openDoorIcon}></i>
                                </div>
                                <p>Sing out</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`menu-off-canvas-bg-dark ${menuActive ? " active" : ""}`} 
                onClick={handleClickMenu}></div>
        </nav>
    )
}

export default Menu