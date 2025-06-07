import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { AdminContext } from '../../Context/AdminContext';


const AllAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const { adminToken } = useContext(AdminContext); // assuming you store admin token here
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/all-appointments`, {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
        setAppointments(res.data.appointments);
      } catch (err) {
        setError('Failed to load appointments');
      }
    };

    fetchAppointments();
  }, []);

  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">All Appointments (Admin)</h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Patient Name</th>
              <th className="p-2 border">Doctor</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Paid</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt, idx) => (
              <tr key={idx} className="text-center border-t">
                <td className="p-2 border">{apt.userId?.name || 'N/A'}</td>
                <td className="p-2 border">{apt.docId?.name || 'N/A'}</td>
                <td className="p-2 border">{apt.slotDate}</td>
                <td className="p-2 border">{apt.slotTime}</td>
                <td className="p-2 border">{apt.cancelled ? 'Cancelled' : 'Active'}</td>
                <td className="p-2 border">{apt.payment ? '✅ Paid' : '❌ Not Paid'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllAppointment;
