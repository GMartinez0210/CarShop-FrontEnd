function Slider(props) {
    if(props.images == null) return

    return (
        <div id={props.id} class="carousel slide" data-bs-ride="true">
            <div class="carousel-indicators">
                {
                    props.images.map((item, index) => {
                        return <button type="button" 
                        data-bs-target={`#${props.id}`} 
                        data-bs-slide-to={index} 
                        class={index == 0 && "active"} 
                        aria-current={index == 0 && "true"}
                        aria-label={"Slider"+index}></button>
                    })
                }

            </div>
            <div class="carousel-inner">
                {
                    props.images.map((item, index) => {
                        return (
                            <div class={`car-view-img carousel-item ${index == 0 && "active"}`}>
                                <img class="d-block w-100" 
                                    src={`http://localhost:4000/api/image/${item.name}`}
                                    alt={item.name} />
                            </div>
                        )
                    })
                }
            </div>
            {/* 
            
            <button class="carousel-control-prev" type="button" data-bs-target={`#${props.id}`} data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target={`#${props.id}`} data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            
             */}
        </div>
    )
}

export default Slider