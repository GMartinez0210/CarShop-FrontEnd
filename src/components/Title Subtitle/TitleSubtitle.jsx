import "./TitleSubtitle.css"

function TitleSubtitle(props) {
    return (
        <div className="title-container">
            <h1 className={`${props.titleClass || ""} title`}>
                {props.title}
            </h1>
            {
                props.subtitle &&
                <h2 className={`${props.subtitleClass || ""} subtitle`}>
                    {props.subtitle}
                </h2>
            }
        </div>
    )
}

export default TitleSubtitle