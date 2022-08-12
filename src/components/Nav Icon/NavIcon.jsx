// * Importing modules
import { useEffect, useRef, useState } from "react"

// * CSS
import "./navIcon.css"

function NavIcon(props) {
    const iconRef = useRef(null)

    const [isClicked, clicked] = useState(false)

    function onClickLink(event) {
        event.preventDefault()

        if(!props.active) {
            props.handleEffect()
            props.setActive(!props.active)
            clicked(true)
        }
    }

    useEffect(() => {
        if(props.active) {
            props.currentPage(iconRef)
        }
    }, [isClicked])

    return (
        <li className="nav-item">
            <a className="nav-link" 
            href="#" ref={iconRef} 
            aria-label={props.ariaLabel} 
            onClick={onClickLink}>
                {
                    props.active
                    ? <i className={`${props.iconFill} nav-icon-fill`}></i>
                    : <i className={`${props.icon} nav-icon`}></i>
                }
            </a>
        </li>
    )
}

export default NavIcon