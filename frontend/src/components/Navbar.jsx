import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { assets } from '../assets/assets'; // Your logo & images
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser, setAuthUser ,  UToken } = useContext(AppContext)
  const { userData, setUserData } = useContext(AppContext)
  const { setUToken } = useContext(AppContext)
  console.log(userData, 'i am user data in navbar')

 
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800 });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow-md">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 py-4 md:px-10" data-aos="fade-down">
        {/* Logo */}
        <img src={assets.logo} alt="Logo" className="h-10 w-auto" />

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="transition active:scale-110">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Links - Desktop */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>
            <li className="hover:text-blue-500 transition">Home</li>
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>
            <li className="hover:text-blue-500 transition">All Doctors</li>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>
            <li className="hover:text-blue-500 transition">About</li>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>
            <li className="hover:text-blue-500 transition">Contact</li>
          </NavLink>
        </ul>

        {/* Profile or Create Account Button */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          {authUser ? (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowDropdown(prev => !prev)}>
              <img className="w-10 h-10 rounded-full" src={userData.image} alt="Profile" />
              <img className="w-[10px] mt-2" src={assets.dropdown_icon} alt="Dropdown Icon" />
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate('/login')}
            >
              Create Account
            </button>
          )}

          {showDropdown && authUser && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-50">
              <NavLink to="/my-profile" className="block px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm" onClick={() => setShowDropdown(false)}>
                My Profile
              </NavLink>
              <NavLink to="/my-appointments" className="block px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm" onClick={() => setShowDropdown(false)}>
                My Appointments
              </NavLink>
              <button
                onClick={() => {
                  localStorage.removeItem('uToken'); // Assuming you store auth token in localStorage
                  localStorage.removeItem('authUser'); // Clear user data
                  setAuthUser(null);
                  setUserData(null)
                  setUToken(null)
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4" data-aos="fade-down">
          <ul className="flex flex-col space-y-4 text-lg font-medium">
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-500 text-gray-700">Home</li>
            </NavLink>
            <NavLink to="/doctors" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-500 text-gray-700">All Doctors</li>
            </NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-500 text-gray-700">About</li>
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-500 text-gray-700">Contact</li>
            </NavLink>
            {authUser ? (
              <>
                <NavLink to="/my-profile" onClick={() => setIsOpen(false)}>
                  <li className="hover:text-blue-500 text-gray-700">My Profile</li>
                </NavLink>
                <NavLink to="/my-appointments" onClick={() => setIsOpen(false)}>
                  <li className="hover:text-blue-500 text-gray-700">My Appointments</li>
                </NavLink>
                <button
                  onClick={() => {
                   
                    localStorage.removeItem('uToken'); // Assuming you store auth token in localStorage
                    localStorage.removeItem('authUser'); // Clear user data
                    setAuthUser(null);
                    setIsOpen(false);
                    setUToken(null)
                  }}
                  className="text-left hover:text-red-500 text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-fit"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/login');
                }}
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
