import "./smallText.css"

function SmallText(props) {
    return (
        <small className={`${props.smallClass || ""} small-text`}>
            <span className="small-text-span">{props.spanText}</span>
            <a className="small-text-link" 
                href={props.href} aria-label={"link"}>
                {props.aText}
            </a>
        </small>
    )
}

export default SmallText