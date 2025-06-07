import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="flex flex-col md:flex-row px-4 md:px-10 gap-6 py-6 md:py-10">

      {/* Left Image */}
      <div className="w-full md:w-[40%]">
        <img className="w-full h-auto rounded-xl" src={assets.about_image} alt="About" />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-[60%] p-2 md:p-4">
        <p className="text-3xl md:text-4xl font-semibold mb-6">About Us</p>

        <p className="text-base md:text-lg leading-relaxed">
          Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently.
          At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments
          and managing their health records.
        </p>

        <p className="text-base md:text-lg leading-relaxed mt-4">
          Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform,
          integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking
          your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
        </p>

        <p className="text-xl md:text-2xl font-semibold mt-6 mb-2">Vision</p>

        <p className="text-base md:text-lg leading-relaxed">
          Our vision at Prescripto is to create a seamless healthcare experience. We aim to bridge the gap between
          patients and healthcare providers, making access to care simple and timely—whenever you need it.
        </p>
      </div>

    </div>
  );
};

export default About;
