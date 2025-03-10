import React from "react";
import featureimg from '../assets/featureimg.webp'

const FeatureSection = () => {
  return (
    <div className="flex flex-col md:flex-row rounded-xl items-center justify-between px-6 md:px-16 py-12 bg-gray-100">
      
      <div className="md:w-1/2 flex justify-center">
        <img
          src={featureimg} 
          alt="Feature"
          className="w-full md:w-3/4 rounded-lg shadow-lg"
        />
      </div>

      {/* Right Section - Text */}
      <div className="md:w-1/2 text-center md:text-left space-y-6 mt-8 md:mt-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Discover the Transformative Benefits of Our Virtual Health Assistant
        </h1>
        <p className="text-gray-700 text-lg">
          Our Virtual Health Assistant enhances your health literacy by
          providing accurate information at your fingertips. Enjoy the
          convenience of booking doctor appointments effortlessly, all from the
          comfort of your home.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-bold text-xl">Health Literacy</h2>
            <p className="text-gray-600">
              Empower yourself with knowledge to make informed health decisions.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Ultimate Convenience</h2>
            <p className="text-gray-600">
              Schedule appointments quickly and easily, saving you time and
              effort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
