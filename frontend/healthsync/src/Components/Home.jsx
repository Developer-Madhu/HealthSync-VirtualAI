import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../Components/HeroSection';
import ContactForm from '../Components/ContactForm';
import FeatureSection from '../Components/FeatureSection';

function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-600/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Next Generation</span>
            <span className="block text-indigo-200">HealthSync AI Assistant</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience the future of healthcare with our AI-powered virtual health assistant. Get instant medical guidance, book appointments, and access cutting-edge AI tools.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link 
                to="/health-suggestion-ai" 
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
              >
                Start Chat
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link 
                to="/ai-tools" 
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10"
              >
                View AI Tools
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <div className="text-indigo-600 text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900">AI-Powered Diagnosis</h3>
            <p className="mt-2 text-gray-600">Advanced algorithms to help identify potential health concerns quickly and accurately.</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <div className="text-indigo-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900">Health Analytics</h3>
            <p className="mt-2 text-gray-600">Comprehensive health tracking and analysis for better healthcare decisions.</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <div className="text-indigo-600 text-4xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold text-gray-900">24/7 Support</h3>
            <p className="mt-2 text-gray-600">Round-the-clock access to AI health assistance and emergency support.</p>
          </div>
        </div>
        <br /><br />
        <HeroSection />
        <br /><br />
        <FeatureSection />
        <br />
        <ContactForm />
      </div>
    </div>
  );
}

export default Home;