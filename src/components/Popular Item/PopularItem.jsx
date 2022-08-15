import "./popularItem.css"

function PopularItem (props) {
    return (
        <div className="popular-item">
            <div className="popular-item-info">
                <p>{props.brand}</p>
                <small>{props.model}</small>
            </div>
            <div className="popular-item-img">
                <img id={props._id} className="" 
                    src={props.image} 
                    alt={props.name} loading="lazzy"
                    onClick={props.showCarView}/>
            </div>
            <div className="popular-item-add">
                <i className="bi bi-plus-lg"></i>
            </div>
        </div>
    )
}

export default PopularItem