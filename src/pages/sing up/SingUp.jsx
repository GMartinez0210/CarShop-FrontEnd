
// * CSS
import "../font.css"
import "./singUp.css"

// * Components
import TitleSubtitle from "../../components/Title Subtitle/TitleSubtitle"
import Input from "../../components/Input/Input"
import SmallText from "../../components/Small Text/SmallText"
import Button from "../../components/Button/button"
import ButtonSocial from "../../components/Button Social/ButtonSocial"

// *  Icons for Button Social
import googleIcon from "../../assets/Sing Up/google-svgrepo-com.svg"
import facebookIcon from "../../assets/Sing Up/facebook-svgrepo-com.svg"

// * Icons
const chevronLeft = "bi bi-chevron-left"
const nameIcon = "bi bi-person-fill"
const emailIcon = "bi bi-envelope-fill"
const passwordIcon = "bi bi-lock-fill"


function SingUp() {
    return (
        <div className="sign-up-container">
            <a className="previous-container"
                href="/login" aria-label="previous">
                <i className={chevronLeft}></i>
            </a>

            <TitleSubtitle title={"Register"} 
            subtitle={"Create your new account"}/>

            <form className="sing-up-form">
                <div className="sing-up-input-container">
                    <Input icon={nameIcon} 
                        placeholder={"Full name"} 
                        type={"text"}/>      
                    <Input icon={emailIcon} 
                        placeholder={"Email"} 
                        type={"email"}/>
                    <Input icon={passwordIcon} 
                        placeholder={"Password"} 
                        type={"password"}/>
                    <Input icon={passwordIcon} 
                        placeholder={"Confirm password"} 
                        type={"password"}/>
                </div>

                <Button buttonClass={"mt-5"} 
                    type={"submit"} 
                    text={"Sing up"}/>
            </form>
            <SmallText smallClass={"text-center"}
                spanText={"Or"} 
                aText={"Sign in with"} 
                href={"#"}/>

            <div className="form-button-social-container">
                <ButtonSocial img={googleIcon} href={"/auth/google"}/>
                <ButtonSocial img={facebookIcon} href={"/auth/facebook"}/>
            </div>

            <SmallText smallClass={"text-center"}
                spanText={"Already have an account?"} 
                aText={"Log in"} 
                href={"/login"}/>
        </div>
    )
}

export default SingUp