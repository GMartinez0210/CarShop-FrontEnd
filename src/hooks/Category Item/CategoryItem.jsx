// * Component
import { useState } from "react"

// * CSS
import "./categoryItem.css"

function CategoryItem(props) {
    const [active, setActive] = useState(props.status)

    
    function onClickButton() {
        //props.searchCar()
        props.cleanButtons()
        setActive(props.status)
    }

    return (
        <button className={`${props.buttonClass || ""} ${active && "active"} category-item-btn`} 
            type="button" aria-label={props.text} 
            onClick={onClickButton}>
            {props.text}
        </button>
    )
}

export default CategoryItem