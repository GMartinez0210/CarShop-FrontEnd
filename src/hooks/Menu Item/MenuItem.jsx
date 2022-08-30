// * Modules
import { useState } from "react"

// * CSS
import "./menuItem.css"

//* Hooks
import MenuItemDarkMode from "../Menu Item Dark Mode/MenuItemDarkMode"

// * Icons
const inboxIcon = "bi bi-inboxes"
const chatIcon = "bi bi-chat"
const gearIcon = "bi bi-gear"

function MenuItem(props) {
    const [itemActive, setItemActive] = useState("All posts")


    const arrayIcon = [inboxIcon, inboxIcon, chatIcon, gearIcon]

    function handleClickLink(event, item) {
        event.preventDefault()

        const itemClicked = item
        setItemActive(itemClicked)
    }

    return (
        <div className="menu-off-canvas-body">
            <ul className="menu-off-canvas-list">
                {
                    props.items.map((item, index) => {
                        return (
                            <li>
                                <a className={`menu-off-canvas-link${item == itemActive ? " active" : ""}`} 
                                    href="#" aria-label={item} 
                                    onClick={(event) => handleClickLink(event, item)}>
                                    <div>
                                        <i className={arrayIcon[index]}></i>
                                    </div>
                                    <p>{item}</p>
                                </a>
                            </li>
                        )
                    })
                }

                <MenuItemDarkMode />
            </ul>
        </div>        
    )
}

export default MenuItem