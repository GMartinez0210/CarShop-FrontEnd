// * Imporing modules
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// * CSS
import "../font.css"
import "./singUp.css"

// * Components
import TitleSubtitle from "../../components/Title Subtitle/TitleSubtitle"
import SmallText from "../../components/Small Text/SmallText"
import Button from "../../components/Button/button"
import ButtonSocial from "../../components/Button Social/ButtonSocial"

// * Hooks
import Input from "../../hooks/Input/Input"

// *  Icons for Button Social
import googleIcon from "../../assets/Sing Up/google-svgrepo-com.svg"
import facebookIcon from "../../assets/Sing Up/facebook-svgrepo-com.svg"

// * Icons
const chevronLeft = "bi bi-chevron-left"
const nameIcon = "bi bi-person-fill"
const emailIcon = "bi bi-envelope-fill"
const passwordIcon = "bi bi-lock-fill"


function SingUp() {
    let navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
            confirm: ""
        },
        onSubmit: async (values) => await onSubmitForm(values)
    })

    const params = (params, values) => {
        let data = ""
        params.forEach((param, index) => {
            if(index == params.length - 1) data += `${param}=${values[param]}`
            else data += `${param}=${values[param]}&`
        })
        return data  
    }

    async function onSubmitForm(values) {
        if(values.password != values.confirm) {
            alert("Passwords don't match")
            return
        }

        const url = "http://localhost:4000/api/user"

        const options = {
            method: "post",
            url,
            data: params(["fullname", "email", "password"], values),
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }

        console.log(options.data)

        const result = await axios(options)
            .then(response => response.data)
            .catch(error => error)

        if(result.error) {
            alert("Couldn't create an user")
            return
        }

        if(result.taken) {
            alert("Email taken. Use another one")
            return
        }

        alert("User created")
        console.log(result)

        navigate("/login", {replace: true})
    }

    return (
        <div className="sign-up-container">
            <a className="previous-container"
                href="/login" aria-label="previous">
                <i className={chevronLeft}></i>
            </a>

            <TitleSubtitle title={"Register"} 
            subtitle={"Create your new account"}/>

            <form className="sing-up-form" onSubmit={formik.handleSubmit}>
                <div className="sing-up-input-container">
                    <Input icon={nameIcon} 
                        placeholder={"Full name"} 
                        type={"text"} name={"fullname"} 
                        value={formik.values.fullname}
                        onChange={formik.handleChange}/>      
                    <Input icon={emailIcon} 
                        placeholder={"Email"} 
                        type={"email"} name={"email"} 
                        value={formik.values.email}
                        onChange={formik.handleChange}/>
                    <Input icon={passwordIcon} 
                        placeholder={"Password"} 
                        type={"password"} name={"password"} 
                        value={formik.values.password}
                        onChange={formik.handleChange}/>
                    <Input icon={passwordIcon} 
                        placeholder={"Confirm password"} 
                        type={"password"} name={"confirm"} 
                        value={formik.values.confirm}
                        onChange={formik.handleChange}/>
                </div>

                <Button buttonClass={"mt-5"} 
                    type={"submit"} 
                    text={"Sing up"}/>
            </form>
            <SmallText smallClass={"text-center"}
                spanText={"Or"} 
                aText={"Sign in with"} 
                href={"#"} redirect={false}/>

            <div className="form-button-social-container">
                <ButtonSocial img={googleIcon} href={"/auth/google"}/>
                <ButtonSocial img={facebookIcon} href={"/auth/facebook"}/>
            </div>

            <SmallText smallClass={"text-center my-5"}
                spanText={"Already have an account?"} 
                aText={"Log in"} 
                href={"/login"} 
                redirect={true}/>
        </div>
    )
}

export default SingUp