// * Importing modules
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"

// * Environmental variables and Utilities
import env from "../../env"
import utilities from "../../utilities"

// * Importing custom functions
import { 
    useFetchCarView, 
    useFetchUserData, 
    useFetchBrands,
    useFetchSearchedCar,
    useFetchFavoritesCar
} from "../../custom/useFetch.js"

// * CSS
import "./favorite.css"

// * Components
import CarItem from "../../components/Car Item/CarItem"
import Menu from "../../components/Menu/Menu"
import SmallText from "../../components/Small Text/SmallText"
import ButtonSubmit from "../../components/Button Submit/ButtonSubmit"
import PopularItem from "../../components/Popular Item/PopularItem"

// * Hooks
import Input from "../../hooks/Input/Input"
import CategoryItem from "../../hooks/Category Item/CategoryItem"

// * Images
import photoDefault from "../../assets//Home/account-avatar-man.svg"

// * Icons
const searchIcon = "bi bi-search"
const confirmIcon = "bi bi-check-lg"

function Favorite(props) {
    // To know if the user logged
    let navigate = useNavigate()
    const [isLoggedIn, setLoggedIn] = useState(false)

    // To fetch data from the api
    const [allCars, addCar] = useState([])
    const [allBrands, addBrand] = useState([])

    // To show the category active
    const [categoryActive, setCategoryActive] = useState("Recomended")

    function getCategoryActive() {
        return categoryActive
    }

    async function handleFetchCars() {
        const car = await useFetchFavoritesCar()
        addCar(car)
    }

    async function handleFetchBrands() {
        const brands = await useFetchBrands()
        addBrand(["Recomended", ...brands])
    }

    async function handleSearchCar(brand, model) {
        const car = await useFetchSearchedCar(brand, model)

        if(brand == "Recomended") {
            setCategoryActive("Recomended")
        }
        else {
            setCategoryActive(car[0].brand)
        }

        addCar(car)
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

            <h1 className="favorite-subtitle">Categories</h1>

            <div className="favorite-categories-container">
                <CategoryItem categories={allBrands} 
                    getCategoryActive={getCategoryActive} 
                    setCategoryActive={setCategoryActive}
                    handleSearchCar={handleSearchCar} />
            </div>

            <div className="car-item-container">
                {
                    allCars.map((car, index) => {
                        const {images: [{name: image}]} = car
                        const {_id, brand, model} = car
                        const {price} = car

                        const name = `${brand} ${model}`
                        const path = env.API_URL+"/api/image/"

                        const priceShown = utilities.newPrice(price)

                        return <CarItem key={`Home-Car-Item-${index}`} 
                            image={path+image} name={name} 
                            brand={brand} model={model} 
                            price={priceShown} _id={_id}
                            showCarView={showCarView}/>
                    })
                }
            </div>
        </div>
    )
}

export default Favorite