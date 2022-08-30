// * Modules
import { useEffect, useState } from "react"

// * CSS
import "./menuItemDarkMode.css"

const sunIcon = "bi bi-sun"
const moonIcon = "bi bi-moon"

function MenuItemDarkMode() {
    const [isDarkMode, setDarkMode] = useState(false)

    function handleClickLink(event) {
        event.preventDefault()

        setDarkMode(!isDarkMode)
    }

    useEffect(() => {
        const root = document.getElementById("root")

        if(isDarkMode) {
            root.classList.add("dark")
        }
        else {
            root.classList.remove("dark")
        }
    }, [isDarkMode])

    return (
        <li>
            <a className="menu-off-canvas-link" 
                href="#" 
                onClick={handleClickLink}>
                <div>
                    {
                        isDarkMode
                        ? <i className={moonIcon}></i>
                        : <i className={sunIcon}></i>
                    }
                </div>
                <p>
                    {
                        isDarkMode
                        ? "Dark mode"
                        : "Light mode"
                    }
                </p>
            </a>
        </li>
    )
}

export default MenuItemDarkMode