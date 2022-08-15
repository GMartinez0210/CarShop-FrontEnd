// * Component
import { useState } from "react"

// * CSS
import "./categoryItem.css"

function CategoryItem(props) {
    const [active, setActive] = useState("Recomended")

    
    function onClickButton(event) {
        const key = event.target.ariaLabel
        setActive(key)
        props.searchCar(key)
    }

    // Return
    return (
        <>
            {
                props.categories.map((brand, index) => {
                    return (
                        <button key={`Home-Category-Item-${index}`} className={`${props.buttonClass || ""} ${active == brand ? "active" : ""} category-item-btn`} 
                            type="button" aria-label={brand} 
                            onClick={onClickButton}>
                            {brand}
                        </button>
                    )
                })
            }
        </>
    )
}

export default CategoryItem