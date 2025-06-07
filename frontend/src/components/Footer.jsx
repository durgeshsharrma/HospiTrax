import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className="w-full bg-slate-200 px-5 md:px-20 py-10">
            <div className="flex flex-col md:flex-row gap-10">

                {/* Left Section */}
                <div className="md:w-1/3">
                    <img className="mb-4 w-36" src={assets.logo} alt="Logo" />
                    <p className="text-sm text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quo quos nisi
                        cupiditate labore officiis tempora inventore, magni aliquam aliquid recusandae alias,
                        ipsa suscipit doloremque sint! Dolor corrupti eius blanditiis similique accusamus?
                    </p>
                </div>

                {/* Center Section */}
                <div className="md:w-1/3">
                    <p className="text-xl font-semibold mb-4">Company</p>
                    <ul className="flex flex-col gap-2 text-gray-800">
                        <li className="hover:underline cursor-pointer">Home</li>
                        <li className="hover:underline cursor-pointer">About</li>
                        <li className="hover:underline cursor-pointer">Contact Us</li>
                        <li className="hover:underline cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div className="md:w-1/3">
                    <p className="text-xl font-semibold mb-4">Get In Touch</p>
                    <p className="font-medium mb-2">📞 +1-212-456-7890</p>
                    <p className="font-medium">📧 durgesh@gmail.com</p>
                </div>

            </div>

            <hr className="my-6 border-gray-400" />

            <div className="text-center text-sm text-gray-600">
                © 2024 Prescripto — All Rights Reserved
            </div>
        </div>
    );
};

export default Footer;
