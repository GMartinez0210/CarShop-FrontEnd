// * CSS
import "./categoryItem.css"

function CategoryItem(props) {
    function onClickButton(event) {
        const key = event.target.ariaLabel
        props.setCategoryActive(key)
        props.handleSearchCar(key)
    }

    return (
        <>
            {
                props.categories.map((brand, index) => {
                    return (
                        <button key={`Home-Category-Item-${index}`} 
                            className={`${props.buttonClass || ""} 
                                ${props.getCategoryActive() == brand ? "active" : ""}   
                                category-item-btn`} 
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