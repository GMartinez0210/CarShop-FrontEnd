import "./smallText.css"

function SmallText(props) {

    function onClickLink(event) {
        if(!props.redirect) event.preventDefault()
    }

    return (
        <small className={`${props.smallClass || ""} small-text`}>
            <span className="small-text-span">{props.spanText}</span>
            <a className="small-text-link" 
                href={props.href} aria-label={"link"} 
                onClick={onClickLink}>
                {props.aText}
            </a>
        </small>
    )
}

export default SmallText