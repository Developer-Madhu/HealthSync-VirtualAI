import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  const isLoggedIn = localStorage.getItem("token")

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">HealthSync</span>
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link to="/blogs" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-indigo-600 transition-colors">
              Blogs
            </Link>
            <Link to="/appointments" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-indigo-600 transition-colors">
              Appointments
            </Link>
            {/* <Link to="/signup" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-indigo-600 transition-colors">
              SignUp
            </Link> */}
            {isLoggedIn ? (
              <Link to="/patient-dashboard" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
            ) : (
              <Link to="/signup" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-indigo-600 transition-colors">
                SignUp
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;