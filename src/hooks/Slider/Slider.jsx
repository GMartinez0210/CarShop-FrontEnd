function Slider(props) {
    if(props.images == null) return

    return (
        <div id={props.id} className="carousel slide" data-bs-ride="true">
            <div className="carousel-indicators">
                {
                    props.images.map((item, index) => {
                        return <button key={"Slider-Button-"+index} type="button" 
                        data-bs-target={`#${props.id}`} 
                        data-bs-slide-to={index} 
                        className={index == 0 ? "active" : ""} 
                        aria-current={index == 0 ? "true" : "false"}
                        aria-label={"Slider"+index}></button>
                    })
                }

            </div>
            <div className="carousel-inner">
                {
                    props.images.map((item, index) => {
                        return (
                            <div key={"Slider-Image-"+index} className={`car-view-img carousel-item ${index == 0 && "active"}`}>
                                <img className="d-block w-100" 
                                    src={`http://localhost:4000/api/image/${item.name}`}
                                    alt={item.name} />
                            </div>
                        )
                    })
                }
            </div>
            {/* 
            
            <button className="carousel-control-prev" type="button" data-bs-target={`#${props.id}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${props.id}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            
             */}
        </div>
    )
}

export default Slider