import "./button.css"

function Button(props) {
    return (
        <button className={`${props.buttonClass || ""} btn button`} type={props.type}>
            {props.text}
        </button>
    )
}

export default Button