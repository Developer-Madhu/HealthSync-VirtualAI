import React from 'react';
import { Calendar } from 'lucide-react';

export const DoctorList = ({ doctors, onSelectDoctor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map(doctor => (
        <div
          key={doctor.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialization}</p>
            <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
            
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>{doctor.availableSlots.filter(slot => !slot.isBooked).length} slots available</span>
            </div>
            
            <button
              onClick={() => onSelectDoctor(doctor)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};