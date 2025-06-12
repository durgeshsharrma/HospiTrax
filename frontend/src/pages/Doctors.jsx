import React, {  useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const navigate = useNavigate()
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([])
  const { doctors } = useContext(AppContext)


  



  const filterDoctor = () => {
    if (!doctors || doctors.length === 0) {
      setFilterDoc([]);
      return;
    }

    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality === speciality))
      console.log(filterDoc)
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    filterDoctor()
  }, [speciality, doctors])

  return (
    <div className='flex mt-4 mb-6 flex-col md:flex-row px-4 md:px-10 gap-6'>

      <div className='md:w-1/4 w-full rounded-lg p-4'>
        <div className='space-y-4'>
          <h1 className='text-xl font-semibold text-gray-800 mb-4'>Browse through the doctor specialist</h1>
          <p onClick={() => { speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician') }} className={`cursor-pointer border p-2  rounded-lg hover:bg-indigo-100 transition-all duration-500  ${speciality == 'General physician' ? "bg-indigo-100 text-black" : ''}`}>General Physician</p>
          <p onClick={() => { speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist') }} className={`cursor-pointer border p-2 rounded-lg hover:bg-indigo-100 transition-all duration-500 ${speciality == 'Gynecologist' ? "bg-indigo-100 text-black" : ''}`}>Gynecologist</p>
          <p onClick={() => { speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist') }} className={`cursor-pointer border p-2 rounded-lg hover:bg-indigo-100 transition-all duration-500  ${speciality == 'Dermatologist' ? "bg-indigo-100 text-black" : ''}`}>Dermatologist</p>
          <p onClick={() => { speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians') }} className={`cursor-pointer border p-2 rounded-lg hover:bg-indigo-100 transition-all duration-500  ${speciality == 'Pediatricians' ? "bg-indigo-100 text-black" : ''}`}>Pediatricians</p>
          <p onClick={() => { speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist') }} className={`cursor-pointer border p-2 rounded-lg hover:bg-indigo-100 transition-all duration-500  ${speciality == 'Neurologist' ? "bg-indigo-100 text-black" : ''}`}>Neurologist</p>
          <p onClick={() => { speciality === 'Gastroenterlogist' ? navigate('/doctors') : navigate('/doctors/Gastroenterlogist') }} className={`cursor-pointer border p-2 rounded-lg hover:bg-indigo-100 transition-all duration-500   ${speciality == 'Gastroenterlogist' ? "bg-indigo-100 text-black" : ''}`}>Gastroenterlogist</p>
        </div>
      </div>

      <div className=' w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {
          filterDoc.map((item, index) => (


            <div onClick={() => { navigate(`/appointment/${item._id}`) }} className='rounded-lg  flex flex-col border items-center' key={index} >
              <img className='border-1 rounded-t-lg  bg-[#eaefff] mb-2' src={item.image} alt="" />
              <div className='flex flex-col self-start p-3'>
                <div className='mb-2'>
                  <p className='border pl-3 rounded-full'>{item.availability ? <span className='text-green-700 font-semibold'>Available</span> : <span className='text-red-700 font-semibold'>UnAvailable</span>}</p>
                </div>
                <p className='text-lg font-semibold'>{item.name}</p>
                <p className='text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Doctors
