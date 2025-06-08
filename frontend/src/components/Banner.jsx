import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Banner = () => {
    

    const Navigate = useNavigate()
    const {uToken} = useContext(AppContext)

  return (
    <div className='flex bg-blue-700 px-6 my-36 lg:px-12 mx-2 md:mx-20 rounded-lg'>
          {/* left */}
          <div className='w-1/2 py-6 md:py-24 md:pl-5 lg:px-10'>
              
              <p className='md:text-4xl mb-2 text-xl font-semibold text-white leading-tight'>Book Appointment</p>
              <p className='text-white text-sm font-semibold md:text-4xl'>with 100+ Trusted Doctors</p>
              <button onClick={() => { uToken ? Navigate('/') : Navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 rounded-full mt-6 px-8 py-3 hover:scale-105 transition-all duration-300'>Create Account</button>
          </div>


          {/* right */}

          <div className='md:w-1/2 md:block relative w-[370px] lg:w-[370px]'>
              <img className='absolute bottom-0 right-0' src={assets.appointment_img} alt="" />
          </div>
    </div>
  )
}

export default Banner
