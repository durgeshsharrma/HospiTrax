import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Navigate } from 'react-router-dom';


const MyProfile = () => {
  const { userData, setUserData, loadUserProfile, uToken } = useContext(AppContext);
  console.log(uToken  , "i am token " )

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [formValues, setFormValues] = useState({
    name: userData?.name || '',
    gender: userData?.gender || 'Male',
    address: userData?.address || '',
    phone: userData?.phone || '',
    dob: userData?.dob || '',
    
    
    // You can add more fields here if you want to edit other details
  });

  // Update form values on input change
  const handleChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      // Prepare form data for sending (multipart/form-data for image upload)
      const data = new FormData();
      data.append('name', formValues.name);
      data.append('phone', formValues.phone )
      data.append('gender', formValues.gender);
      data.append('address', formValues.address);
      data.append('dob', formValues.dob);

      console.log(data , 'me hu data jo  raha hu')
    


      if (image) {
        data.append('image', image);
      }

      // Make PUT/PATCH request to update profile
      const res = await axios.put(
        `${ import.meta.env.VITE_API_URL }/api/user/update-profile/${userData._id}`, // Replace with your API endpoint
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${uToken}`,
          },
        }
      );

      
      setIsEdit(false);
      setImage(null);

      Swal.fire({
              title: 'Profile Updated Successfully',
              icon: 'success',
              confirmButtonText: 'Close'
      }).then(() => {
        // Reload profile data from server
        loadUserProfile();
            })

      // Reload profile data from server
      loadUserProfile();

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return userData ? (
    <div className="px-4 md:px-10 py-8 max-w-4xl mx-auto">
      <div className="flex flex-col bg-gray-100  md:flex-row gap-8 items-center md:items-start  p-6 shadow-lg rounded-xl border border-gray-200">

        {/* Profile Picture */}
        {isEdit ? (
          <label htmlFor="image">
            <div className='inline-block relative cursor-pointer group'>
              <img
                className='w-36 h-36 rounded-full border-4 border-gray-200 object-cover opacity-90 group-hover:opacity-70 transition'
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              {!image && (
                <img
                  className='w-9 absolute bottom-1 right-1 bg-gray-900  p-1 rounded-full shadow group-hover:scale-105 transition'
                  src={assets.upload_icon}
                  alt="Upload Icon"
                />
              )}
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id='image'
              hidden
              accept="image/*"
            />
          </label>
        ) : (
          <div className="w-32 h-32">
            <img
              src={userData.image}
              alt="Profile"
              className="rounded-full w-full h-full object-cover border-4 border-gray-200"
            />
          </div>
        )}

        {/* Profile Info */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
            <button
              onClick={() => {
                if (isEdit) {
                  handleSave();
                } else {
                  setIsEdit(true);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
            >
              {isEdit ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-gray-700">
            {/* Name */}
            <div>
              <label className="font-semibold">Name:</label>
              {isEdit ? (
                <input
                  type="text"
                  value={formValues.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="border px-3 py-2 w-full rounded mt-1 focus:outline-blue-500"
                />
              ) : (
                <p className="mt-1">{userData.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold">Email:</label>
              <p className="mt-1">{userData.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="font-semibold">Phone:</label>
              {isEdit ? (
                <input
                  type="text"
                  value={formValues.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="border px-3 py-2 w-full rounded mt-1 focus:outline-blue-500"
                />
              ) : (
                <p className="mt-1">{userData.phone}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="font-semibold">Gender:</label>
              {isEdit ? (
                <select
                  className="mt-1 border rounded px-3 py-2 w-full focus:outline-blue-500"
                  value={formValues.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="mt-1">{userData.gender}</p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="font-semibold">Date of Birth:</label>
              {isEdit ? (
                <input
                  type="text"
                  value={formValues.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                  className="border px-3 py-2 w-full rounded mt-1 focus:outline-blue-500"
                />
              ) : (
                <p className="mt-1">{userData.dob}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="font-semibold">Address:</label>
              {isEdit ? (
                <input
                  type="text"
                  value={formValues.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="border px-3 py-2 w-full rounded mt-1 focus:outline-blue-500"
                />
              ) : (
                <p className="mt-1">{userData.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  ) : <Navigate to='/'></Navigate>;
};

export default MyProfile;
