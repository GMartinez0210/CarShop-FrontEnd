import React, { useRef, useState } from "react"

// * CSS
import "./input.css"

// * Icons
const revealIcon = "bi bi-eye-fill"
const nonRevealIcon = "bi bi-eye-slash-fill"

function Input(props) {
    const inputRef = useRef(null)
    const [inputType, setInputType] = useState(props.type)
    
    const revealRef = useRef(null)
    const [isReveal, setReveal] = useState(false)
    
    function onClickFocus() {
        inputRef.current.focus()
    }

    function onClickReveal() {
        if(props.type == "password") {
            inputRef.current.focus()

            if(inputRef.current.type == "password") {
                setInputType("text")
                setReveal(true)
                return
            }
            
            if(inputRef.current.type == "text") {
                setInputType("password")
                setReveal(false)
                return
            }
        }
    }

    return(
        <label className={`${props.inputClass || ""} input`} 
            onClick={() => {onClickFocus()}}>
            <div className="input-icon">
                <i className={`${props.icon} ${props.iconClass || ""}`}></i>
            </div>
            <input ref={inputRef} 
                className={`input-field ${props.type != "password" && "input-no-password" }`} 
                type={inputType || "text"} 
                placeholder={props.placeholder} 
                name={props.name} value={props.value} 
                onChange={props.onChange}/>
            {
                props.type == "password" &&
                <div ref={revealRef} className="input-reveal" 
                    onClick={() => {onClickReveal()}}>
                    {
                        isReveal
                        ? <i className={revealIcon}></i>
                        : <i className={nonRevealIcon}></i>
                    }
                </div>
            }
        </label>
    )
}

export default Input