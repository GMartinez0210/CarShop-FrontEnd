import "./buttonSubmit.css"

function ButtonSubmit(props) {
    return (
        <button className={`${props.buttonClass || ""} button-submit`} 
            type="submit">
            {
                props.text && props.text
            }
            {
                props.icon &&
                <i className={props.icon}></i>
            }
            {
                props.image &&
                <img className="button-submit-img" 
                    src={props.image} alt="" loading="lazzy"/>
            }
        </button>
    )
}

export default ButtonSubmit