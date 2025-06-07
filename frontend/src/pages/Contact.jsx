import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 md:px-10 py-8">
      <p className="text-3xl font-semibold mb-6 text-center md:text-left">Contact Us</p>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Left Image */}
        <div className="w-full md:w-[40%]">
          <img className="w-full h-auto rounded-lg" src={assets.contact_image} alt="Contact" />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-[60%] text-base md:text-lg space-y-4">
          <div>
            <p className="text-xl font-semibold mb-1">Our Office</p>
            <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi?</p>
            <p className="text-gray-700">Lorem ipsum dolor sit amet.</p>
          </div>

          <div>
            <p className="text-xl font-semibold mb-1">Phone</p>
            <p className="text-gray-700">Tel: (451) 555-0132</p>
          </div>

          <div>
            <p className="text-xl font-semibold mb-1">Career at Hospitrax</p>
            <p className="text-gray-700">Join our team and help us build the future of healthcare technology.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
