// * Modules
import { useState } from "react"

// * Hooks
import Nav from "./hooks/Nav/Nav"

// * Pages
import Home from "./pages/home/Home"
import CarView from "./hooks/Car View/CarView"
import Favorite from "./pages/favorite/Favorite"
import Account from "./pages/account/Account"
import Nothing from "./pages/nothing/Nothing"
import Cart from "./pages/cart/Cart"

function App() {
    const [page, setPage] = useState("Home")
    const [nothing, setSomething] = useState(false)

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

    function renderHome() {
        if(nothing) {
            return <Nothing />
        }

        return <Home setCarView={setCarView} 
        setShownCarView={setShownCarView} 
        setSomething={setSomething}/>
    }

    function renderFavorite() {
        if(nothing) {
            return <Nothing 
            paragraphTop={"You don't have any favorite car yet"} 
            paragraphBottom={"Visit other views. Maybe there you will find your favorite car!"}/>
        }

        return <Favorite setCarView={setCarView}
        setShownCarView={setShownCarView}
        setSomething={setSomething}/>
    }

    function renderCart() {
        if(nothing) {
            return <Nothing />
        }

        return <Cart />
    }

    function renderAccount() {
        if(nothing) {
            return <Nothing />
        }
        
        return <Account />
    }

    return (
        <>
            {
                (page == "Home" && !shownCarView ) && renderHome()
            }

            {
                ((page == "Home" || page == "Favorite") && shownCarView)
                && <CarView car={carView} hideCarView={hideCarView}
                    price={carView != null && newPrice(carView.price)} />
            }

            {
                (page == "Favorite" && !shownCarView) && renderFavorite()
            }

            {
                page == "Cart" && renderCart() 
            }

            {
                page == "Account" && renderAccount()
            }

            {
                !shownCarView
                && <Nav setPage={setPage} getPage={getPage} setSomething={setSomething}/>
            }
        </>
    )
}

export default App
