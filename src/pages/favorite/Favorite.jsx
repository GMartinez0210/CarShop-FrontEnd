// * Importing modules
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"

// * Importing custom functions
import { 
    useFetchCarView,
    useFetchFavoritesCar
} from "../../custom/useFetch.js"

// * CSS
import "./favorite.css"

// * Components
import SmallText from "../../components/Small Text/SmallText"

// * Hooks
import CategoryItem from "../../hooks/Category Item/CategoryItem"

// * Images
import CategoryCar from "../../components/Category Car/CategoryCar"

function Favorite(props) {
    // To know if the user logged
    let navigate = useNavigate()
    const [isLoggedIn, setLoggedIn] = useState(false)

    // To fetch data from the api
    const [allCars, addCar] = useState([])
    const [allBrands, addBrand] = useState([])

    // To show the category active
    const [categoryActive, setCategoryActive] = useState("All")

    function getCategoryActive() {
        return categoryActive
    }

    async function handleFetchCars() {
        const car = await useFetchFavoritesCar()
        if(!car) {
            props.setSomething(true)
            return
        }

        props.setSomething(false)
        addCar(car)
    }

    async function handleFetchBrands() {
        const cars = await useFetchFavoritesCar()

        const brands = cars 
            ? cars.map(car => car.brand)
                .filter((brand, index, brands) => 
                    brands.indexOf(brand) == index)
            : []

        addBrand(["All", ...brands])
    }

    async function showCarView(event) {
        const carViewDataFetched = await useFetchCarView(event.target)
        if(carViewDataFetched) props.setCarView(carViewDataFetched)
        props.setShownCarView(true)
    }

    useEffect(() => {
        const userID = window.localStorage.getItem("userID")
        if(!userID) {
            navigate("/login", {replace: true})
            setLoggedIn(false)
            return
        }

        setLoggedIn(true)
    }, [])

    useEffect(() => {
        if(isLoggedIn) {
            handleFetchCars()
            handleFetchBrands()
        }
    }, [isLoggedIn])

    return (
        <div className="favorite">
            <SmallText spanText={"Let's see your"} aText={"favorite cars"} 
                href={"#"} redirect={false} smallClass={"favorite-small-text"}/>

            <div className="favorite-categories-container">
                <CategoryItem categories={allBrands} 
                    getCategoryActive={getCategoryActive} 
                    setCategoryActive={setCategoryActive} />
            </div>

            {
                <CategoryCar allBrands={allBrands} allCars={allCars} showCarView={showCarView}/>
            }
        </div>
    )
}

export default Favorite