// * Modules
import env from "../../env"
import utilities from "../../utilities"

// * CSS
import "./categoryCar.css"

// * Component
import CarItem from "../Car Item/CarItem"

function CategoryCar(props) {
    function CategoryCarItem(props) {
        return props.allBrands.map((brandName, brandIndex) => {
            return (
                <>
                    <h1 className="favorite-subtitle">{brandName}</h1>

                    <div className="category-car-container">
                        {
                            props.allCars.filter(car => {
                                if(brandName == "All") return car
                                if(car.brand == brandName) return car
                            }).map((car, carIndex) => {
                                const {images: [image]} = car
                                const {_id, brand, model} = car
                                const {price} = car

                                const name = `${brand} ${model}`
                                const path = env.API_URL+"/api/image/"

                                const priceShown = utilities.newPrice(price)

                                return <CarItem key={`Home-Car-Item-${brandIndex}-${carIndex}`} 
                                    image={path+image} name={name} 
                                    brand={brand} model={model} 
                                    price={priceShown} _id={_id}
                                    showCarView={props.showCarView}/>
                            })
                        }
                    </div>
                </>
            )
        })
    }

    return CategoryCarItem(props)
}

export default CategoryCar