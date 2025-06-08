import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { uToken } = useContext(AppContext)
  const [hasCancelledAppointments, setHasCancelledAppointments] = useState(false);

  console.log(appointments)


  const handleCancel = async (appointmentId) => {
    try {
      const res = await axios.put(
        `${ import.meta.env.VITE_API_URL }/api/user/cancel-appointment/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      );

      if (res.data.success) {
        // Remove or update the appointment from state
        setAppointments(prev =>
          prev.map(app =>
            app._id === appointmentId ? { ...app, cancelled: true } : app
          )

          



        );

        Swal.fire({
          title: 'Successfully your Appointment Cancelled',
          text: "You can book another appointment",
          icon: 'success',
          confirmButtonText: 'Close'
        }).then(() => {
          window.location.reload(); // Refresh the appointments list
        })
      } else {
         Swal.fire({
                title: 'Failed',
                text: "Failed to cancel appointment",
                icon: 'warning',
                confirmButtonText: 'Close'
              })
      
      }
    } catch (err) {
      alert("Something went wrong while cancelling.");
    }
  };
  

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        // const token = localStorage.getItem('token'); // or wherever you store your JWT

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/my-appointments`, {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        });

        if (res.data.success) {
          setAppointments(res.data.appointments);
          // check if any appointment is cancelled
          const hasCancelled = res.data.appointments.some((apt) => apt.cancelled === true);
          setHasCancelledAppointments(hasCancelled);
        } else {
          setError('Failed to load appointments');
        }
      } catch (err) {
        setError('Error fetching appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading appointments...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="px-4 md:px-10 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center md:text-left">My Appointments</h1>
      {hasCancelledAppointments && <button
        className="mt-6 my-6 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
        onClick={async () => {
          try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/remove-cancelled`, {
              headers: {
                Authorization: `Bearer ${uToken}`,
              },
            });
            
            Swal.fire({
              title: 'Successfully Deleted Cancelled Appointments',
              text: `You have ${res.data.message}`,
              icon: 'success',
              confirmButtonText: 'Close'
            }).then(() => {
              window.location.reload(); // or refresh appointments list
            })
            
          } catch (err) {
            console.error(err);
            alert('Error removing cancelled appointments');
          }
        }}
      >
        Remove Cancelled Appointments
      </button>}


      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appointment, index) => {
            const doctor = appointment.docId;
            console.log(doctor , 'me hu doctor ji')
            const dateObj = new Date(appointment.date);
            const dateStr = dateObj.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start border p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                {/* Doctor Image */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6 object-cover"
                />

                {/* Doctor Info */}
                <div className="flex-1 w-full">
                  <h2 className="text-xl font-semibold">{doctor.name}</h2>
                  <p className="text-gray-600">{doctor.speciality}</p>

                  <div className="mt-2 text-sm text-gray-700">
                    <p className="font-medium">Address:</p>
                    <p>{doctor.address || ''}</p>
                    
                  </div>

                  <div className="mt-3 text-sm">
                    <p className="text-gray-800">
                      <span className="font-medium">Date & Time:</span> {appointment.slotDate} | {appointment.slotTime}
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Booked on: {dateStr}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {appointment.cancelled ? null : (
                      appointment.payment ? (
                        <button
                          disabled
                          className="px-4 py-2 bg-green-600 text-white rounded cursor-not-allowed"
                        >
                          Paid
                        </button>
                      ) : (
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={async () => {
                            try {
                              const res = await axios.post(
                                `${import.meta.env.VITE_API_URL}/api/payment/create-checkout-session`,
                                {
                                  amount: appointment.amount,
                                  appointmentId: appointment._id,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${uToken}`,
                                  },
                                }
                              );

                              window.location.href = res.data.url;
                            } catch (err) {
                              alert('Payment session failed.');
                              console.error(err);
                            }
                          }}
                        >
                          Pay Online
                        </button>
                      )
                    )}

                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleCancel(appointment._id)}
                      disabled={appointment.cancelled}
                    >
                      {appointment.cancelled ? 'Cancelled' : 'Cancel Appointment'}
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
