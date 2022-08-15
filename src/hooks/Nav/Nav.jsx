// * Importing modules
import { useEffect, useRef, useState } from "react"

// * CSS
import "./nav.css"

// * Components
import NavIcon from "../Nav Icon/NavIcon"

function Nav(props) {
    const upload = "bi bi-shift"
    const uploadFill = "bi bi-shift-fill"
    const [uploadActive, setUploadActive] = useState(false)

    const arrayAriaLabel = ["Home", "Favorite", "Cart", "Account"]

    return (
        <nav className="container-fluid position-fixed bottom-0 home-navbar-container">
            <div className="home-navbar">
                <label htmlFor="navbar-upload" className="home-navbar-upload">
                    {
                        uploadActive
                        ? <i className={`${uploadFill} upload-icon`}></i>
                        : <i className={`${upload} upload-icon`}></i>
                    }
                </label>
                <input id="navbar-upload" className="d-none" type={"file"}/>
                <ul className="home-navbar-icons">
                    <NavIcon arrayAriaLabel={arrayAriaLabel} getPage={props.getPage}/>
                </ul>
            </div>
        </nav>
    )
}

export default Nav