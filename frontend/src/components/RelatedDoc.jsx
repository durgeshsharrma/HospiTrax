import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const RelatedDoc = ({ speciality, docId }) => {
    
    const { doctors } = useContext(AppContext)
    
    const [relDoc, setRelDoc] = useState([]);


    const fetchRelatedDoctors = () => {
        const relatedDoctors = doctors.filter((doctor) => doctor.speciality === speciality && doctor._id !== docId);
        if (relatedDoctors) {
            setRelDoc(relatedDoctors);
        }
    }

    useEffect(() => {
        if (speciality && docId) fetchRelatedDoctors();
    })

  return (
      <div className='text-center mb-4'>
          <h1 className='text-3xl font-semibold mb-6 text-gray-800 mb-4'>Related Doctors</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {
                    relDoc.map((item, index) => (
                        <div  className='rounded-lg  flex flex-col border items-center' key={index} >
                            <img className='border-1 rounded-t-lg  bg-[#eaefff] mb-2' src={item.image} alt="" />
                            <div className='flex flex-col self-start p-3'>
                                <div className='mb-2 flex'>
                                    <p className='text-green-700 justify-start font-semibold'>Available</p>
                                </div>
                                <p className='text-lg sellf-start font-semibold'>{item.name}</p>
                                <p className='text-sm self-start'>{item.speciality}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
    </div>
  )
}

export default RelatedDoc