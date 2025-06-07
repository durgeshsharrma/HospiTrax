import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext()

const AppContextProvider = (props) => {

    console.log('me hu context ke andar---------------------------------')

    const [authUser, setAuthUser] = useState(
        localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null
    )
    const [uToken, setUToken] = useState(localStorage.getItem('uToken') ? (localStorage.getItem('uToken')) : null)
    console.log(uToken)
    
    const [doctors, setDoctors] = useState([])
    const [userData, setUserData] = useState(false)

    const getAllDoctors = () => {
        axios({
            url: `${import.meta.env.VITE_API_URL}/api/doctor/list`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${uToken}`   // 🛑 Yeh zaroori hai
            }
        }).then((res) => {
            toast.success(res.data.message, { autoClose: 3000 });
            setDoctors(res.data)
        }).catch((err) => {
            console.log(err.response?.data?.error);
            toast.error(JSON.stringify(err.response?.data?.error), { autoclose: 3000 });
        })
    }


    const loadUserProfile = async () => {
        try {
            axios({
                url: `${import.meta.env.VITE_API_URL}/api/user/get-profile`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${uToken}`
                  }
            }).then((res) => {

                // alert(JSON.stringify(res.data.userData), { autoClose: 3000 });
                setUserData(res.data.userData)
              
            }).catch((err) => {
                console.log(err.response?.data?.error);
                toast.error(JSON.stringify(err.response?.data?.error), { autoclose: 3000 });
            })
            
        } catch (err)
        {
            console.log(err)
            alert(err , 'err hunme update me')
        }
    }

    const value = {
        authUser,
        setAuthUser,
        getAllDoctors,
        doctors,
        userData,
        setUserData,
        loadUserProfile,
        setUToken,
        uToken
    }

    useEffect(() => {
        getAllDoctors()
    }, [])

    useEffect(() => {

        if (uToken)
        {
            loadUserProfile()
        } else {
            setUserData(false);
        }

    } , [uToken])

    

    // ✅ Yeh return ab function ke andar hai
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
