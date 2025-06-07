import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { AdminContext } from '../../Context/AdminContext';

const Dashboard = () => {
  const { adminToken } = useContext(AdminContext);
  const [stats, setStats] = useState({ users: 0, doctors: 0, appointments: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard-stats`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl mt-2">{stats.users}</p>
        </div>
        <div className="bg-green-100 p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Total Doctors</h2>
          <p className="text-3xl mt-2">{stats.doctors}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Total Appointments</h2>
          <p className="text-3xl mt-2">{stats.appointments}</p>
        </div>
      </div>


      


    </div>
  );
};

export default Dashboard;
