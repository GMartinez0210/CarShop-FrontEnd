// * Modules
import { useState, useEffect } from "react"

// * Importing custom functions
import { 
	useFetchCarView, 
	useFetchUserData, 
	useFetchCars, 
	useFetchBrands,
	useFetchSearchedCar, 
	useFetchSearchedCarByBrand
} from "../../middlewares/useFetch.js"

// * Environmental variables
import env from "../../env"

// * CSS
import "./account.css"

// * Hooks
import OutputInfo from "../../components/Output Info/OutputInfo"

// * Images
import photoDefault from "../../assets//Home/account-avatar-man.svg"

const emailIcon = "bi bi-envelope"
const phoneIcon = "bi bi-phone"

function Account() {
	const [userData, setUserData] = useState({})

    async function handleFetchUserData() {
		const user = await useFetchUserData()
		setUserData(user)
	}

    useEffect(() => {
		handleFetchUserData()
    }, [])

    return (
        <div className="account">
            <header className="account-profile">
                <img className="account-profile-photo" 
					src={
						(userData.photo != null || userData.photo != undefined)
						? `${env.API_URL}/api/photo/${userData.photo.name}`
						: photoDefault
					} 
					alt={""}/>
                <h1 className="account-profile-name">{userData.fullname}</h1>
            </header>
			<main>
				<section>
					<OutputInfo title={"Email"} 
						icon={emailIcon} value={userData.email} />
				</section>
				<section>
					
				</section>
			</main>
        </div>
    )
}

export default Account