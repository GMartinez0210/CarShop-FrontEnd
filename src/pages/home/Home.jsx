// * Importing modules
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import axios from "axios"

// * Environmental variables and Utilities
import env from "../../env"
import utilities from "../../utilities"

// * Importing custom functions
import { 
	useFetchCarView, 
	useFetchUserData, 
	useFetchCars, 
	useFetchBrands,
	useFetchSearchedCar, 
	useFetchSearchedCarByBrand
} from "../../custom/useFetch.js"

// * CSS
import "./home.css"

// * Components
import CarItem from "../../components/Car Item/CarItem"
import Menu from "../../hooks/Menu/Menu"
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
		// !! ERROR not searching anything
		const {search} = values

		const words = search.trim().split(" ")
		
		const brand = words.length == 1 
		? words[0] : words.shift()
		
		const brandParse = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()
		
		const model = !!words[0] 
			? words.map(value => {
				const newValue = `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`
				return newValue
			}).reduce((current, next) => `${current} ${next}`) 
			: undefined

		await handleSearchCar(brandParse, model)
	}

	async function handleSearchCar(brand, model) {
		if(brand == "Recomended") {
			const cars = await useFetchCars()
			addCar(cars)
			return
		}

		const cars = !!model 
			? await useFetchSearchedCar(brand, model)
			: await useFetchSearchedCarByBrand(brand)

		setCategoryActive(cars[0].brand)
		addCar(cars)
	}

	async function handleFetchPopulars() {
		const cars = await useFetchCars()
		addPopular(cars)
	}

	async function showCarView(event) {
		const carViewDataFetched = await useFetchCarView(event.target)
		if(carViewDataFetched) props.setCarView(carViewDataFetched)
		props.setShownCarView(true)
	}

	async function handleLogin() {
		/*
		* ADD THE CODE FOR PRODUCCTION
		const userID = window.localStorage.getItem("userID")
		if(!userID) {
			setLoggedIn(false)
			navigate("/login", {replace: true})
			return
		}

		const sessionUserID = await axios.get(env.API_URL+"/api/login?user="+userID)
			.then(response => response.data)
			.catch(() => null)

		if(!sessionUserID.loggedIn) {
			setLoggedIn(false)
			navigate("/login", {replace: true})
			return
		}
		*/
		setLoggedIn(true)
	}

	useEffect(() => {
		handleLogin()
	})

	useEffect(() => {
		if(isLoggedIn) {
			handleFetchUserData()
			handleFetchCars()
			handleFetchBrands()
			handleFetchPopulars()
			props.setSomething(false)
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
						const {images: [image]} = car
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
					const {images: [image]} = car
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