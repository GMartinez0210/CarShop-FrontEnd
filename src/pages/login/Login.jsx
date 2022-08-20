// * Importing modules
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// * Components
import LogoVector from "../../components/Logo Vector/LogoVector"
import TitleSubtitle from "../../components/Title Subtitle/TitleSubtitle"
import SmallText from "../../components/Small Text/SmallText"
import Button from "../../components/Button/button"

// * Hooks
import Input from "../../hooks/Input/Input"

// * Icons
const emailIcon = "bi bi-envelope-fill"
const passwordIcon = "bi bi-lock-fill"

// ! REMOVE AFTER FINISHING THIS
// ! TO CREATE A NEW COMPONENT => "Form"
import "./login.css"
import { useEffect } from "react"

function Login() {
    let navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
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
        const url = "http://localhost:4000/api/login"

        const options = {
            method: "post",
            url,
            data: params(["email", "password"], values),
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
        
        const result = await axios(options)
            .then(response => response.data)
            .catch(error => error)
        
        if(result.error) {
            alert("Cant log in")
            return
        }

        if(result.userID == null) {
            alert("Not found the user")
            return
        }

        if(result.email && !result.password) {
            alert("Password incorrect")
            return
        }

        window.localStorage.setItem("userID", result.userID)
        navigate("/", {replace: true})
    }

    useEffect(() => {
        const userID = window.localStorage.getItem("userID")
        if(userID) {
            navigate("/", {replace: true})
        }
    })

    return(
        <div>
            <LogoVector />
            <TitleSubtitle 
            title={"Welcome!"} 
            subtitle={"Login to your account"}/>

            <form className="mt-3 login-form" onSubmit={formik.handleSubmit}>
                <Input icon={emailIcon} 
                    placeholder={"Enter email"} 
                    type={"email"} name={"email"} 
                    value={formik.values.email}
                    onChange={formik.handleChange}/>
                <Input icon={passwordIcon} 
                    placeholder={"******"} 
                    type={"password"} name={"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    inputClass={"mt-4"}/>
                <SmallText smallClass={"mt-3 text-end"} 
                    aText={"Forgot your password?"} 
                    href={"/forgot"} redirect={true}/>
                <Button buttonClass={"mb-4 mt-5"}
                    type={"submit"} text={"Login"}/>
                <SmallText smallClass={"mb-4 mt-4 text-center"} 
                    spanText={"Don't have an account?"}
                    aText={"Sing up"} href={"/singup"} 
                    redirect={true}/>
            </form>
        </div>
    )
}

export default Login