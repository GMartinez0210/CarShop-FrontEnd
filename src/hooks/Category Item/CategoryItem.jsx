// * CSS
import "./categoryItem.css"

function CategoryItem(props) {
    let buttonMainClass = "category-item-btn" 

    if(props.buttonClass) buttonMainClass + " " + props.buttonClass

    function onClickButton(event) {
        const key = event.target.ariaLabel
        props.setCategoryActive(key)
        props.handleSearchCar && props.handleSearchCar(key)
    }

    if(props.favoritePage) {
        return (
            <>
                {
                    props.categories.map((brand, index) => {
                        return (
                            <a key={`Home-Category-Item-${index}`} 
                                className={`${buttonMainClass}${props.getCategoryActive() == brand ? " active" : ""}`} 
                                type="button" aria-label={brand} 
                                onClick={onClickButton} 
                                href={`#${brand}`}>
                                {brand}
                            </a>
                        )
                    })
                }
            </>
        )
    }

    return (
        <>
            {
                props.categories.map((brand, index) => {
                    return (
                        <button key={`Home-Category-Item-${index}`} 
                            className={`${buttonMainClass}${props.getCategoryActive() == brand ? " active" : ""}`} 
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