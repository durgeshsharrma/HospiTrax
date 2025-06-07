
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const AddDoctor = () => {
    const navigate =  useNavigate()
    const [formData, setFormData] = useState({
        image: null,
        name: "",
        email: "",
        password: "",
        speciality: "",
        experience: "",
        fees: "",
        degree: "",
        address: "",
        about: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prev) => ({ ...prev, image: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can replace this with your own submission logic (e.g., axios/fetch to backend)
        const payload = new FormData();
        payload.append("image", formData.image);
        payload.append("name", formData.name);
        payload.append("email", formData.email);
        payload.append("password", formData.password);
        payload.append("speciality", formData.speciality);
        payload.append("experience", formData.experience);
        payload.append("fees", formData.fees);
      
        payload.append("degree", formData.degree);
        payload.append("address", formData.address);
        payload.append("about", formData.about);

        console.log("Submitting doctor:", formData);

        // Here you can send the payload to your backend API



        
        axios(`${import.meta.env.VITE_API_URL}/api/admin/add-doctor`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          data : payload,
            "Content-Type": "multipart/form-data",
        })
            .then((res) =>
                toast.success(res.data.message))
            navigate('/doctor-list')
          
         
          .catch(err => toast.error(err.response.data.message));
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8" >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Doctor</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Doctor Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Speciality */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
                    <select
                        name="speciality"
                        value={formData.speciality}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Speciality</option>
                        <option value="General physician">General Physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatrician</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                    <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Experience</option>
                        {[...Array(41)].map((_, idx) => (
                            <option key={idx} value={idx}>
                                {idx} {idx === 1 ? "year" : "years"}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fees */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fees (₹)</label>
                    <input
                        type="number"
                        name="fees"
                        value={formData.fees}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Contact Number
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        placeholder="e.g. 9876543210"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}

                {/* Education */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input
                        type="text"
                        name="degree"
                        value={formData.education}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* About */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-center">
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                    >
                        Add Doctor
                    </button>
                </div>
            </form>
           
        </div>
    );
};

export default AddDoctor;



