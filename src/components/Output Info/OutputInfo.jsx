import React from "react"

// * CSS
import "./outputInfo.css"

function OutputInfo(props) {
    return(
        <div className="output-info">
            <h2 className="output-info-title">{props.title}</h2>
            <div className="output">
                <div className="output-icon">
                    <i className={props.icon}></i>
                </div>
                <p className="output-field">{props.value}</p>
            </div>
        </div>
    )
}

export default OutputInfo