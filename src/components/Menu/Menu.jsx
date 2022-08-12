// * CSS
import "./menu.css"

function Menu(props) {
    return (
        <nav>
            <button className="menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target={"#"+props.offNavBar} aria-controls={props.offNavBar}>
                <i className="bi bi-text-left"></i>
            </button>
            <div className="offcanvas offcanvas-start menu-off-nav" tabindex="-1" id={props.offNavBar} aria-labelledby={props.offNavBarLabel}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id={props.offNavBarLabel}>{props.offTitle}</h5>
                    <button type="button" className="menu-btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                        <i className="bi bi-x"></i>
                    </button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 h-100">
                        <li className="nav-item">
                            <a className="nav-link" href={`/post?_id=${props.user}`}>My posts</a>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link dark-mode-container">
                                <label htmlFor="dark-mode-checkbox">Dark mode: </label>
                                <input id={"dark-mode-checkbox"} type={"checkbox"} />
                                <div className="dark-mode">
                                    <span className="dark-mode-icon"></span>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item mt-auto">
                            <a className="nav-link" href="/singout">Sing out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Menu