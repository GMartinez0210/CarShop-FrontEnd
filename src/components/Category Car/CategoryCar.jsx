// * Modules
import env from "../../env"
import utilities from "../../utilities"

// * CSS
import "./categoryCar.css"

// * Component
import CarItem from "../Car Item/CarItem"

function CategoryCar(props) {
    return props.allBrands.map((brandName, brandIndex) => {
        return (
            <>
                <h1 id={brandName} className="favorite-subtitle">{brandName}</h1>
                <div className="category-car-container">
                    {
                        props.allCars.filter(car => {
                            if(brandName == "All") return car
                            if(car.brand == brandName) return car
                        }).map((car, carIndex) => {
                            const {images: [image]} = car
                            const {_id, brand, model, price} = car

                            const name = `${brand} ${model}`
                            const path = env.API_URL+"/api/image/"

                            return <CarItem key={`Home-Car-Item-${brandIndex}-${carIndex}`} 
                                image={path+image} name={name} 
                                brand={brand} model={model} 
                                price={utilities.newPrice(price)} _id={_id}
                                showCarView={props.showCarView}/>
                        })
                    }
                </div>
            </>
        )
    })
}

export default CategoryCar