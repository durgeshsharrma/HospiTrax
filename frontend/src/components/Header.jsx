import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {

    
  return (
    <div className='flex mt-5 flex-col md:flex-row flex-wrap bg-sky-600 rounded-lg px-6 md:px-10 lg:px-20 '>

          {/* Left Side */}
          <div className='md:w-1/2 flex flex-col justify-center gap-10 m-auto py-[10vw] md:py-[10vw] md:mb-[-30]'>
              <p className='text-3xl  md:text-4xl lg:text-5xl font-semibold text-white md:leading-tight '>Book Appointment <br /> with Trusted Doctors</p>
              <div className='flex gap-2 items-center'>
                  <img className='h-8' src={assets.group_profiles} alt="" />
                  <p className='text-[13px] md:text-sm text-white'>Simply Browse through our extensive list of trusted doctors</p>
              </div>
              <a href="#speciality" className='flex items-center gap-2 md:w-[70%] justify-center bg-white text-sky-600 px-8 py-2 m-auto md:m-0 rounded-3xl hover:scale-105 font-semibold hover:bg-gray-500 hover:text-white transition duration-300'>
                  Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
              </a>
              
          </div>


          {/* Right side */}
          <div className='md:w-1/2 relative'>
              <img className='w-full h-auto md:absolute rounded-lg bottom-0' src={assets.header_img} alt="" />
             
          </div>

      
    </div>
  )
}

export default Header
