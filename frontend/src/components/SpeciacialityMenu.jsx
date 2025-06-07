import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpeciacialityMenu = () => {
  return (
      <div id="speciality" className='flex px-6 flex-col items-center gap-4 py-16 text-gray-800'>
          
          <h1 className='text-4xl font-semibold leading-tight'>Find By Speciality</h1>
          <p className='text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>

          <div className='flex sm:justify-center gap-4 pt-4 w-full overflow-scroll '>
              {
                  specialityData.map((item, index) => (
                      <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center hover:translate-y-[-10px] cursor-pointer flex-shrink-0 duration-500 transition-all' to={`/doctors/${item.speciality}`} key={index} >
                          <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                          <p>{ item.speciality }</p>
                      </Link>
                    ))
              }
          </div>
      
    </div>
  )
}

export default SpeciacialityMenu
