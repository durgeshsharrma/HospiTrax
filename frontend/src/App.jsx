import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import About from "./pages/About"
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments"
import Navbar from "./components/Navbar"
import Contact from "./pages/Contact"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "./components/Footer"
import Appointment from "./pages/Appointment"
import PaymentSuccess from "./pages/PaymentSuccess"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"



function App() {


  const {uToken} = useContext(AppContext)
 

  return (
    <>
      <ToastContainer />
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/doctors" element={<Doctors></Doctors>}></Route>
        <Route path="/doctors/:speciality" element={<Doctors></Doctors>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/login" element={uToken ? <Navigate to='/'></Navigate> : <Login></Login>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/my-profile" element={<MyProfile></MyProfile>}></Route>
        <Route path="/my-appointments" element={<MyAppointments></MyAppointments>}></Route>
        <Route path="/appointment/:docId" element={<Appointment></Appointment>}></Route>
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
