import "./carItem.css"

function CarItem(props) {
    return (
        <figure className="car-item">
            <img className="car-item-img" src={props.image} alt={props.name}/>
            <figcaption className="car-item-info">
                <div className="car-item-text">
                    <p className="car-item-brand">{props.brand}</p>
                    <small className="car-item-model">{props.model}</small>
                </div>
                <div>
                    <p className="car-item-price">{props.price}</p>
                </div>
            </figcaption>
        </figure>
    )
}

export default CarItem