import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Login = () => {
    const [role, setRole] = useState('admin'); // admin | doctor | user
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setAdminToken, adminToken , backendUrl} = useContext(AdminContext)
    const navigate = useNavigate()
      const MySwal = withReactContent(Swal);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/${role}/login`, formData);
            const { token } = res.data;

            // Save token in localStorage
            setAdminToken(token)
            localStorage.setItem('adminToken', token);
            localStorage.setItem('role', role);

            MySwal.fire({
                title: 'Login Successfully',
                text: `Welcome Back ${role}`,
                icon: 'success',
                confirmButtonText: 'Close',
            });

            toast.success(`${role} logged in successfully`);

            // Navigate to dashboard (based on role)
            navigate(`/${role}-dashboard`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">{role.toUpperCase()} Login</h2>

                {/* Role Selector */}
                <div className="flex justify-center mb-6 gap-4">
                    {['admin', 'doctor'].map(r => (
                        <button
                            key={r}
                            type="button"
                            className={`px-4 py-2 rounded-lg font-medium ${role === r ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                            onClick={() => setRole(r)}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login as {role}
                </button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Login;
