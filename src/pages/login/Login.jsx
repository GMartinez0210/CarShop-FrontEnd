// * Components
import LogoVector from "../../components/Logo Vector/LogoVector"
import TitleSubtitle from "../../components/Title Subtitle/TitleSubtitle"
import Input from "../../components/Input/Input"
import SmallText from "../../components/Small Text/SmallText"
import Button from "../../components/Button/button"

// * Icons
const emailIcon = "bi bi-envelope-fill"
const passwordIcon = "bi bi-lock-fill"

// ! REMOVE AFTER FINISHING THIS
// ! TO CREATE A NEW COMPONENT => "Form"
import "./login.css"

function Login() {
    return(
        <div>
            <LogoVector />
            <TitleSubtitle 
            title={"Welcome!"} 
            subtitle={"Login to your account"}/>

            <br />

            <form className="mt-3 login-form">
                <Input icon={emailIcon} 
                    placeholder={"Enter email"} 
                    type={"email"}/>
                <Input icon={passwordIcon} 
                    placeholder={"******"} 
                    type={"password"} 
                    inputClass={"mt-4"}/>
                <SmallText smallClass={"mt-3 text-end"} 
                    aText={"Forgot your password?"} 
                    href={"/forgot"}/>
                <Button buttonClass={"mb-4 mt-5"}
                    type={"submit"} text={"Login"}/>
                <SmallText smallClass={"mb-4 mt-4 text-center"} 
                    spanText={"Don't have an account?"}
                    aText={"Sing up"} href={"/singup"}/>
            </form>
        </div>
    )
}

export default Login