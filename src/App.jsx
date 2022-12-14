import { useState } from "react"

// * Hooks
import Nav from "./hooks/Nav/Nav"

// * Pages
import Home from "./pages/home/Home"
import CarView from "./hooks/Car View/CarView"
import Nothing from "./pages/nothing/Nothing"
import Favorite from "./pages/favorite/Favorite"

function App() {
    const [page, setPage] = useState("")

    const [shownCarView, setShownCarView] = useState(false)
    const [carView, setCarView] = useState(null)

    function getPage() {
        return page
    }

    function newPrice(value) {
        if(value >= Math.pow(10,6)) return `$ ${value/Math.pow(10,6)} M`
        if(value >= Math.pow(10,3)) return `$ ${value/Math.pow(10,3)} K`
    }

    function hideCarView() {
        setShownCarView(false)
    }

    return (
        <>
            {
                page == "Home" 
                && !shownCarView 
                && <Home setCarView={setCarView} setShownCarView={setShownCarView}/>
            }

            {
                page == "Home" 
                && shownCarView 
                && <div> 
                    <CarView car={carView} hideCarView={hideCarView}
                        price={carView != null && newPrice(carView.price)} />
                </div>
            }

            {
                page == "Favorite"
                && <Favorite />
            }

            {
                !shownCarView
                && <Nav setPage={setPage} getPage={getPage}/>
            }
        </>
    )
}

export default App
