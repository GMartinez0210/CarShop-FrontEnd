import { useState } from "react"

import Nav from "./hooks/Nav/Nav"
import Home from "./pages/home/Home"

function App() {
  const [loaded, setToLoad] = useState()
  const [page, setPage] = useState("")

  // TODO Refactor and fix the navigation bar component 
  // TODO which isn't working correctly

  function currentPage(iconRef) {
    if(iconRef.current.ariaLabel == "Home")
      setPage(iconRef.current.ariaLabel)
  }

  return (
    <>
      {page == "Home" && <Home />}      
      <Nav currentPage={currentPage}/>
    </>
  )
}

export default App
