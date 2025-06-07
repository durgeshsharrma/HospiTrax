import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorsList = () => {
  const { doctors, AllDoctors, adminToken, changeDoctorAvailability } = useContext(AdminContext);

  useEffect(() => {
    AllDoctors();
  }, [adminToken , doctors]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Doctors List</h2>

      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            // <div key={doctor._id} className="border p-4 rounded-lg shadow">
            //   <img
            //     src={doctor.image}
            //     alt={doctor.name}
            //     className="w-full h-48 object-cover object-center rounded-t"
            //   />
            //   <h3 className="text-xl font-semibold mt-2">{doctor.name}</h3>
            //   <p className="text-gray-700">Email: {doctor.email}</p>
            //   <p className="text-gray-700">Speciality: {doctor.speciality}</p>
            //   <p className="text-gray-700">Experience: {doctor.experience}</p>
            //   <p className="text-gray-700">Fees: ₹{doctor.fees}</p>
            // </div>

            <div className='rounded-lg  flex flex-col border items-center' key={doctor._id} >
              <img className='border-1 hover:bg-blue-600 transition-all duration-500 rounded-t-lg  bg-[#eaefff] mb-2' src={doctor.image} alt="" />
              <div className='flex flex-col self-start p-3'>
                <div className='mb-2'>
                  <input onChange={() => changeDoctorAvailability(doctor._id)} type="checkbox" checked={doctor.availability} />
                 { doctor.availability ? <p className='text-green-700 font-semibold'>Available</p> : <p className='text-red-700 font-semibold'>Unavailable</p>}
                 
                </div>
                <p className='text-lg font-semibold'>{doctor.name}</p>
                <p className='text-sm'>{doctor.speciality}</p>
              </div>
            

            </div>
          ))}
          
        </div>
      ) : (
        <p>No doctors found.</p>
      )}
      
    </div>
  );
};

export default DoctorsList;
