import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate, useNavigate } from 'react-router-dom'


const TopDoctors = () => {

    const { doctors } = useContext(AppContext)
    const Navigate = useNavigate()

  return (
      <div className='flex flex-col px-10 w-full gap-4 items-center'>
          
          <h1 className='text-4xl font-semibold text-gray-800 '>Top Doctors</h1>
          <p>Simply browse through our extensive list of trusted doctors.</p>

          <div className='grid w-full md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-4 pt-4 '>
              {
                  doctors.map((item, index) => (
                      <div className='rounded-lg   flex flex-col border items-center align-items-center' key={index} >
                          <img className='border-1 rounded-t-lg  bg-[#eaefff] mb-2' src={item.image} alt="" />
                          <div className='flex flex-col self-start p-3'>
                              <div className='mb-2'>
                                  <p className='text-green-700 font-semibold'>Available</p>
                              </div>
                              <p className='text-lg font-semibold'>{item.name}</p>
                              <p className='text-sm'>{item.speciality}</p>
                          </div>
                      </div>
                    ))     
              }
          </div>
          <button onClick={() => { Navigate('/doctors');  scrollTo(0,0)}} className='bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition w-fit'>more</button>
       
    </div>
  )
}

export default TopDoctors
