import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../Context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Navbar = () => {
    const MySwal = withReactContent(Swal);
    const { adminToken, setAdminToken , role } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = () => {

        MySwal.fire({
            title: 'You Want To Logout',
            text: "Logout Successfull",
            icon: 'warning',
            confirmButtonText: 'Yes, Logout',
        });
        toast.success('Logged out successfully', { autoClose: 3000 });
        localStorage.removeItem('role')
        localStorage.removeItem('adminToken');
        setAdminToken(null);
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md px-4 py-3 md:px-8 flex items-center justify-between">
            {/* Left: Logo and Role */}
            <div className="flex items-center gap-3">
                <img src={assets.admin_logo} alt="Admin Logo" className="w-36 h-10 object-contain" />
                <p className="text-sm btn border rounded-full px-2  font-semibold text-gray-700">
                    {adminToken ? 'Admin' : 'Doctor'}
                </p>
            </div>

            {/* Right: Logout Button */}
            <div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
