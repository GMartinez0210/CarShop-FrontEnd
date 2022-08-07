import "./buttonSocial.css"

function ButtonSocial(props) {
    return (
        <a className="button-social-btn" href={props.href} aria-label={"auth"}>
            <div>
                {
                    props.img
                    ? <img className="button-social-img" src={props.img} 
                        alt="" loading="lazzy"/>
                    : <i className={`${props.icon} button-social-icon`}></i>
                }
            </div>
        </a>
    )
}

export default ButtonSocial