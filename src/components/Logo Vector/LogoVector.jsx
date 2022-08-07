import "./logoVector.css"

// Images
import tesla from "../../assets/Login/Tesla.jpeg"
import vector from "../../assets/Login/Vector.svg"

function LogoVector() {
    return (
        <div className="logoVector">
            <img className="logoVector-img" 
                src={tesla} alt="" 
                loading="lazzy"/>
            <img className="logoVector-vector" 
                src={vector} alt="" 
                loading="lazzy"/>
        </div>
    )
}

export default LogoVector