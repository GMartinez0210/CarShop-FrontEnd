import { useState } from "react"

// * Hooks
import Nav from "./hooks/Nav/Nav"

// * Pages
import Home from "./pages/home/Home"

function App() {
  const [page, setPage] = useState("")

  function getPage(value) {
    setPage(value)
  }

  return (
    <>
      {page == "Home" && <Home />}
      <Nav getPage={getPage}/>
    </>
  )
}

export default App
