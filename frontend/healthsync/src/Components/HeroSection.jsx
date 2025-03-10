import React from "react";
import video from '../assets/video.jpg'

const HeroSection = () => {
  return (
    <div className="rounded-xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 bg-gray-100">
      {/* Left Section - Text */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Enhance Your Video Chat Experience
        </h1>
        <p className="text-gray-700 text-lg">
          Connect with people seamlessly using our interactive video chat
          solution with real-time engagement.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
          Get Started
        </button>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-[60%] h-72 flex justify-center mt-8 md:mt-0">
        <img
          src={video}
          alt="Video Call"
          className="w-[95%] md:w-[95%] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
