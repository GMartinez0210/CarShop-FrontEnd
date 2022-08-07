import React from "react"

// CSS
import "./welcome.css"

// Image
import tesla from "../../assets/Welcome/Tesla.jpeg"

function Welcome() {
    return (
        <div className="welcome">
            <div className="welcome-container">
                <div className="welcome-img-container">
                    <img className="welcome-img" src={tesla} 
                        alt="Tesla" title="Tesla" 
                        loading="lazzy"/>
                </div>
                <div className="welcome-title">
                    <h1>Car Shop</h1>
                </div>    
                <div className="welcome-paragraph">
                    <p>You will find your dream car here</p>
                </div>    
                <a className="welcome-next"
                    href="/login"
                    aria-label="next">
                    <i className="bi bi-chevron-right"></i>
                </a>    
            </div>
        </div>
    )
}

export default Welcome