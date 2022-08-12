// * Importing modules
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import axios from "axios"

// * CSS
import "./home.css"

// * Components
import CarItem from "../../components/Car Item/CarItem"
import Menu from "../../components/Menu/Menu"
import SmallText from "../../components/Small Text/SmallText"
import Input from "../../hooks/Input/Input"
import ButtonSubmit from "../../components/Button Submit/ButtonSubmit"
import CategoryItem from "../../hooks/Category Item/CategoryItem"

// * Icons
const searchIcon = "bi bi-search"
const confirmIcon = "bi bi-check-lg"

function Home() {
    const [allCars, addCar] = useState([])
    const [allBrands, addBrand] = useState([])

    const url = "http://localhost:4000"
    
    async function useFetchCars() {
        const carArray = await axios.get(url+"/api/car")
        .then(response => response.data)
        .catch(error => {
            console.log(error)
            return null
        })
    
        if(carArray == null) return

        const {car} = carArray

        if(car == null) return

        addCar(car)
    }

    async function useFetchBrands() {
        const brandArray = await axios.get(url+"/api/car/brand")
            .then(response => response.data)
            .catch(error => {
                console.log(error)
                return null
            })

        if(brandArray == null) return

        const {brands} = brandArray

        if(brands == null) return

        addBrand(["Recomended", ...brands])
    }

    function newPrice(value) {
        if(value >= Math.pow(10,6)) return `$ ${value/Math.pow(10,6)} M`
        if(value >= Math.pow(10,3)) return `$ ${value/Math.pow(10,3)} K`
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

        const brand = words.length == 1 ? words[0] : words.shift()
        const model = words.length > 1 ? words.reduce((total, value) => total + " " + value) : undefined

        const options = model ? `?brand=${brand}&model=${model}` : `?brand=${brand}`

        const carArray = await axios.get(url+"/api/search"+options)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
            return null
        })
    
        if(carArray == null) return

        const {car} = carArray

        if(car == null) return

        addCar(car)
    }

    function searchCar() {

    }

    const [activeButton, setActiveButton] = useState([])
    function cleanButtons() {

    }

    useEffect(() => {
        useFetchCars()
        useFetchBrands()
    }, [])

    return (
        <div className="home">
            <header className="home-header">
                <Menu offNavBar={"off-navbar"} 
                    offNavBarLabel={"off-navbar-title"} 
                    offTitle={"Menu"}/>

                <a className="home-profile" href="/profile">
                    <img className="home-profile-photo" 
                        src="http://localhost:4000/api/photo/1658982068574-457182275-ig-profile.jpg" 
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

            <h1 className="home-categories">Categories</h1>

            <div className="home-categories-container">
                {
                    allBrands.map((brand, index) => {
                        return <CategoryItem text={brand} cleanButtons={cleanButtons}/>
                    })
                }
            </div>

            <div className="car-item-container">
                {
                    allCars.map((car, index) => {
                        const {images: [{name: image}]} = car
                        const {brand, model} = car
                        const {price} = car

                        const name = `${brand} ${model}`
                        const path = "http://localhost:4000/api/image/"

                        const priceShown = newPrice(price)

                        return <CarItem key={`Home-Car-Item-${index}`} image={path+image} name={name} 
                            brand={brand} model={model} price={priceShown}/>
                    })
                }
            </div>
        </div>
    )
}

export default Home