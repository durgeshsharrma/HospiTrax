import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {setAuthUser} = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    
  });

  // const [errorMsg, setErrorMsg] = useState('');

  const handleToggle = () => {
    setIsLogin(prev => !prev);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrorMsg('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!email || !password || (!isLogin && (!name))) {
      toast.error('Please fill all required fields' , {autoclose : 3000});
      return;
    }

    axios({
      method: 'post',
      url: isLogin ? `${import.meta.env.VITE_API_URL}/api/user/login` : `${import.meta.env.VITE_API_URL}/api/user/register`,
      data: {
        name: isLogin ? undefined : name,
        email,
        password
      }
    }).then((res) => {
    
      // setAuthUser(res.data.user);
      localStorage.setItem('uToken', res.data.uToken);
      localStorage.setItem('authUser', JSON.stringify(res.data.user));
      Swal.fire({
        title: 'Login Successfully',
        text: "Welcome Back",
        icon: 'success',
        confirmButtonText: 'Close'
      }).then(() => {
        window.location.href = '/';
      })
      
     
    }).catch((err) => {
      console.log('aya')
      // setErrorMsg(err.response?.data?.message || 'An error occurred');
      toast.error(err.response?.data?.message || 'An error occurred', {autoclose : 3000} )
      // console.error(err);
      // Optionally, you can log the error response to the console
      // For example, if you want to log the entire response:
  
     
     
     })

   

    
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-green-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {/* {errorMsg && <p className="text-red-500 mb-4 text-sm">{errorMsg}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={handleToggle}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
