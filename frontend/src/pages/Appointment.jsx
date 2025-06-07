import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoc from '../components/RelatedDoc';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, uToken , userData } = useContext(AppContext);
    const [docInfo, setDocInfo] = useState(null);

    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const timeSlots = [
        "10:00 AM", "11:00 AM", "12:00 PM",
        "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    const fetchDoctorInfoById = () => {
        const doctorInfo = doctors.find((doctor) => doctor._id === docId);
        if (doctorInfo) {
            setDocInfo(doctorInfo);
        }
        
    };

    useEffect(() => {
        if (docId) fetchDoctorInfoById();
    }, [doctors, docId]);

    // Convert 12hr slot to 24hr time object
    const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return { hours, minutes };
    };

    const handleBooking = async () => {
        const now = new Date();
        const selected = new Date(selectedDate);
        const today = now.toISOString().split('T')[0];

        if (!selectedDate || !selectedSlot) {
            setErrorMsg('Please select both a date and time slot.');
            setBookingConfirmed(false);
            return;
        }

        if (selectedDate < today) {
            setErrorMsg('Please select a future date.');
            setBookingConfirmed(false);
            return;
        }

        if (selectedDate === today) {
            const { hours, minutes } = parseTime(selectedSlot);
            const selectedDateTime = new Date();
            selectedDateTime.setHours(hours, minutes, 0, 0);

            if (selectedDateTime <= now) {
                setErrorMsg('Please select a future time slot.');
                setBookingConfirmed(false);
                return;
            }
        }

        try {
           
            // const userId = localStorage.getItem('userId'); // Get logged-in user id

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/user/book-appointment`,
                {
                   userId :  userData._id,
                    docId,
                    slotDate: selectedDate,
                    slotTime: selectedSlot,
                },
                {
                    headers: {
                        Authorization: `Bearer ${uToken}`,
                    },
                }
            );

            if (response.data.success) {
                setBookingConfirmed(true);
                setErrorMsg('')
                Swal.fire({
                        title: 'Your Appointment Fixed Successfuly',
                        text: "Visit On Time",
                        icon: 'success',
                        confirmButtonText: 'Close'
                      })
            } else {
                setBookingConfirmed(false);
                setErrorMsg(response.data.message || 'Booking failed');
                toast.error(response.data.message || 'Booking failed');
            }
        } catch (error) {
            console.error('Booking failed:', error);
            setBookingConfirmed(false);
            setErrorMsg('Something went wrong while booking.');
            toast.error('Something went wrong');
        }
    };

    // Minimum date for date input is today
    const minDate = new Date().toISOString().split('T')[0];

    return (
        docInfo && (
            <div className="p-4 md:p-6 space-y-10 w-full">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="w-full h-[22rem] md:w-[30%] bg-sky-500 rounded-2xl">
                        <img className="w-full h-[22rem] rounded-t-2xl md:rounded-2xl object-cover" src={docInfo.image} alt={docInfo.name} />
                    </div>

                    <div className="w-full md:w-[70%] p-4 md:p-8 border space-y-4 rounded-2xl">
                        <h1 className="flex items-center text-2xl md:text-3xl font-semibold gap-2">
                            <span>{docInfo.name}</span>
                            <img className="w-6 h-6" src={assets.verified_icon} alt="verified" />
                        </h1>
                        <p className="text-lg md:text-xl">{docInfo.degree} - {docInfo.speciality}</p>
                        <p className="text-lg md:text-xl font-semibold">About</p>
                        <p className="text-base md:text-xl">{docInfo.about}</p>
                        <p className="text-lg md:text-xl font-semibold">Appointment Fee : ${docInfo.fees}</p>
                        <hr />

                        <div>
                            <p className='text-2xl mb-5 font-semibold '>Book Slot</p>
                            <input
                                type="date"
                                min={minDate}
                                className="border p-2 rounded-md"
                                value={selectedDate}
                                onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                    setBookingConfirmed(false);
                                    setErrorMsg('');
                                }}
                            />
                        </div>

                        <div>
                            <p className="text-lg font-semibold mb-1 mt-2">Available Time Slots:</p>
                            <div className="flex flex-wrap gap-2">
                                {timeSlots.map((slot, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 border rounded-full ${selectedSlot === slot
                                            ? "bg-sky-600 text-white"
                                            : "bg-white text-gray-700"
                                            } hover:bg-sky-500 hover:text-white transition`}
                                        onClick={() => {
                                            setSelectedSlot(slot);
                                            setBookingConfirmed(false);
                                            setErrorMsg('');
                                        }}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleBooking}
                                className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Confirm Booking
                            </button>
                            {errorMsg && <p className="mt-2 text-red-600">{errorMsg}</p>}
                            {bookingConfirmed && (
                                <p className="mt-2 text-green-700 font-semibold">
                                    Appointment booked on <span className="underline">{selectedDate}</span> at <span className="underline">{selectedSlot}</span>!
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <RelatedDoc docId={docId} speciality={docInfo.speciality} />
            </div>
        )
    );
};

export default Appointment;
