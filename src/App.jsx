import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Userinfo from "./components/Create"
import Read from "./components/Read"
import Update from "./components/Update"




function App() {
  

  return (
    <>
   <Navbar/>
   <Routes>
    <Route  path="/" element={<Userinfo/>}/>
    <Route path="/read" element={<Read/>}/>
    <Route path="/edit/:id" element={<Update/>}/>
   

   </Routes>
   
    </>
  )
}

export default App
