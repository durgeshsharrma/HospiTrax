import React, { useContext, useState } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { NavLink } from 'react-router-dom';
import {
    Menu,
    X,
    LayoutDashboard,
    UserCog,
    UserPlus,
    CalendarDays,
} from 'lucide-react';
import Login from '../Pages/Login';

const Sidebar = () => {
    const { adminToken } = useContext(AdminContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!adminToken) return <Login></Login>;

    return (
        <>
            {/* Mobile Nav */}
            <div className="md:hidden bg-white shadow flex justify-between items-center px-4 py-3 fixed w-full z-50">
                <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700">
                    {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm text-gray-800 transform transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    } md:static md:h-screen`}
            >
                <div className="p-5 border-b border-gray-200">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                </div>

                <nav className="mt-4 overflow-y-auto h-[calc(100vh-64px)]">
                    <ul className="space-y-1 text-sm">
                        <li>
                            <NavLink
                                to="/admin-dashboard"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-6 py-3 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''
                                    }`
                                }
                            >
                                <LayoutDashboard size={20} />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/doctor-list"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-6 py-3 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''
                                    }`
                                }
                            >
                                <UserCog size={20} />
                                Doctors List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/add-doctor"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-6 py-3 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''
                                    }`
                                }
                            >
                                <UserPlus size={20} />
                                Add Doctor
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/all-appointments"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-6 py-3 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''
                                    }`
                                }
                            >
                                <CalendarDays size={20} />
                                Appointments
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
