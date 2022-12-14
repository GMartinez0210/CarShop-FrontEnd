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
    useFetchCars, 
    useFetchBrands,
    useFetchSearchedCar 
} from "../../custom/useFetch.js"

// * CSS
import "./home.css"

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

function Home(props) {
    // To know if the user logged
    let navigate = useNavigate()
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState({})

    // To fetch data from the api
    const [allCars, addCar] = useState([])
    const [allBrands, addBrand] = useState([])
    const [allPopulars, addPopular] = useState([])

    // To show the category active
    const [categoryActive, setCategoryActive] = useState("Recomended")

    function getCategoryActive() {
        return categoryActive
    }

    async function handleFetchUserData() {
        const user = await useFetchUserData()
        setUserData(user)
    }

    async function handleFetchCars() {
        const car = await useFetchCars()
        addCar(car)
    }

    async function handleFetchBrands() {
        const brands = await useFetchBrands()
        addBrand(["Recomended", ...brands])
    }
    
    const searchForm = useFormik({
        initialValues: {
            search: ""
        },
        onSubmit: async (values) => await onSubmitSearch(values)
    })

    async function onSubmitSearch(values) {
        const {search} = values

        const words = search.trim().split(" ")

        const brand = words.length == 1 
            ? words[0] : words.shift()
        
        const model = words.length > 1 
            ? words.reduce((total, value) => `${total} ${value}`) 
            : undefined

        await handleSearchCar(brand, model)
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

    async function handleFetchPopulars() {
        const car = await useFetchCars()
        addPopular(car)
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
            handleFetchUserData()
            handleFetchCars()
            handleFetchBrands()
            handleFetchPopulars()
        }
    }, [isLoggedIn])

    return (
        <div className="home">
            <header className="home-header">
                <Menu offNavBar={"off-navbar"} 
                    offNavBarLabel={"off-navbar-title"} 
                    offTitle={"Menu"}/>

                <a className="home-profile" href="/profile">
                    <img className="home-profile-photo" 
                        src={
                            (userData.photo != null || userData.photo != undefined)
                            ? `${env.API_URL}/api/photo/${userData.photo.name}`
                            : photoDefault
                        } 
                        alt={""}/>
                </a>
            </header>

            <SmallText spanText={"Let's find your"} aText={"car"} 
                href={"#"} redirect={false} smallClass={"home-small-text"}/>

            <form className="home-search-form" onSubmit={searchForm.handleSubmit}>
                <Input inputClass={"home-search-input"} name={"search"}
                    type={"search"} placeholder={"Search car..."} 
                    icon={searchIcon} iconClass={"input-search"}  
                    value={searchForm.values.search} 
                    onChange={searchForm.handleChange}/>

                <ButtonSubmit buttonClass={"home-button-submit"} 
                    icon={confirmIcon}/>
            </form>

            <h1 className="home-subtitle">Categories</h1>

            <div className="home-categories-container">
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

            <h1 className="home-subtitle">Most popular</h1>

            {
                allPopulars.map((car, index) => {
                    const {images: [{name: image}]} = car
                    const {_id, brand, model} = car

                    const name = `${brand} ${model}`
                    const path = env.API_URL+"/api/image/"

                    return <PopularItem key={`Home-Populat-Item-${index}`} 
                        brand={brand} model={model} _id={_id} 
                        image={path+image} name={name} 
                        showCarView={showCarView}/>
                })
            }
        </div>
    )
}

export default Home