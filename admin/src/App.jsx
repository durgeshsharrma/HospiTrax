import { useContext } from "react"
import Login from "./Pages/Login"
import { AppContext } from "./Context/AppContext"
import { AdminContext } from "./Context/AdminContext"
import Navabar from "./Component/Navabar"
import Sidebar from "./Component/Sidebar"
import { Route, Routes, Navigate } from "react-router-dom"
import Dashboard from "./Pages/Admin/Dashboard"
import AllAppointment from "./Pages/Admin/AllAppointment"
import AddDoctor from "./Pages/Admin/AddDoctor"
import DoctorsList from "./Pages/Admin/DoctorsList"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"; // Your custom instance







function App() {

  const {adminToken} = useContext(AdminContext)
  // Axios interceptor
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response && err.response.status === 401) {
        if (err.response.data.message === "jwt expired") {
          alert("Session expired. Please log in again.");

          // Use window.location instead of navigate
          window.location.href = "/login";
        }
      }
      return Promise.reject(err);
    }
  );
 

  return adminToken ? (
    <div className='overflow-y-hidden'>
      <ToastContainer />
      <Navabar></Navabar>
      <div className="flex h-[calc(100vh-64px)]"> {/* Assuming navbar is 64px */}
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/doctor-list" />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointment />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
          </Routes>
        </div>
      </div>
      
    </div>
  ) : (
    <>

      <Login></Login>
      
    </>
  )
}

export default App
