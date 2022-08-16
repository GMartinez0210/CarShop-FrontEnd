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
import ButtonSubmit from "../../components/Button Submit/ButtonSubmit"
import PopularItem from "../../components/Popular Item/PopularItem"

// * Hooks
import Input from "../../hooks/Input/Input"
import CategoryItem from "../../hooks/Category Item/CategoryItem"


// * Icons
const searchIcon = "bi bi-search"
const confirmIcon = "bi bi-check-lg"

function Home(props) {
    // To fetch data from the api
    const [allCars, addCar] = useState([])
    const [allBrands, addBrand] = useState([])
    const [allPopulars, addPopular] = useState([])

    // To show a view

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

        const brand = words.length == 1 
            ? words[0] : words.shift()
        
        const model = words.length > 1 
            ? words.reduce((total, value) => `${total} ${value}`) 
            : undefined

        await searchCar(brand, model)
    }

    async function searchCar(brand, model) {

        let options = ""

        if(brand != "Recomended") {
            options = model 
                ? `?brand=${brand}&model=${model}` 
                : `?brand=${brand}`
        }

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

    async function useFetchPopulars() {
        const carArray = await axios.get(url+"/api/car")
        .then(response => response.data)
        .catch(error => {
            console.log(error)
            return null
        })
    
        if(carArray == null) return

        const {car} = carArray

        if(car == null) return

        addPopular(car)
    }

    async function useFetchCarView(target) {
        const _id = target.id

        const carInfo = await axios.get(url+`/api/car?_id=${_id}`)
            .then(response => response.data)
            .catch(error => null)

        if(carInfo == null) return

        const {car} = carInfo

        console.log(car)

        props.setCarView(car)
    }

    async function showCarView(event) {
        await useFetchCarView(event.target)
        props.setShownCarView(true)
    }

    useEffect(() => {
        useFetchCars()
        useFetchBrands()
        useFetchPopulars()
    }, [])

    return (
        <div className="home">
            <header className="home-header">
                <Menu offNavBar={"off-navbar"} 
                    offNavBarLabel={"off-navbar-title"} 
                    offTitle={"Menu"}/>

                <a className="home-profile" href="/profile">
                    <img className="home-profile-photo" 
                        src="http://localhost:4000/api/photo/1660280589149-175435867-ig-profile.jpg" 
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
                    searchCar={searchCar} />
            </div>

            <div className="car-item-container">
                {
                    allCars.map((car, index) => {
                        const {images: [{name: image}]} = car
                        const {_id, brand, model} = car
                        const {price} = car

                        const name = `${brand} ${model}`
                        const path = "http://localhost:4000/api/image/"

                        const priceShown = newPrice(price)

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
                    const path = "http://localhost:4000/api/image/"

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