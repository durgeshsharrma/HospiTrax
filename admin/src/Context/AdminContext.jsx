import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminContext = createContext();


const AdminContextProvider = ({ children }) => {

    const initialState = localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : null;
    const [doctors, setDoctors] = useState([]);
    const [adminToken, setAdminToken] = useState(initialState);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    



    //Getting All Doctors and making accessiable to all Components

     const AllDoctors = () => {
        axios({
          url : `${import.meta.env.VITE_API_URL}/api/admin/all-doctors`,
          method: 'get',
          headers: {
            
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Assuming you store the token in localStorage
          }
          
        })
          .then((res) => {
            setDoctors(res.data.doctors);
          })
          .catch((err) => {
            toast.error(err.response.data.message)
        })
      }


    // Change availaibility of doctor
    const changeDoctorAvailability = (docId) => {
        console.log(docId);
        axios({
            url: `${import.meta.env.VITE_API_URL}/api/admin/change-availability/${docId}`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            
           
        })
            .then((res) => {
                AllDoctors(); // Refresh the list after changing availability
              
                toast.success(res.data.message , { autoClose: 3000 });
            })
            .catch((err) => {
                alert(err);
            });
    };



    const value = {
         
        backendUrl,
        adminToken,
        setAdminToken,
        doctors,
        AllDoctors,
        changeDoctorAvailability
       


    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;