import React, { useState } from 'react';
import { doctors, specializations } from '../../data/mockdata';
import { DoctorList } from '../Components/DoctorList';
import { AppointmentBooking } from '../Components/AppointmentBooking';
import { VideoCall } from '../Components/VideoCall';
import { Search, Calendar, Video } from 'lucide-react';

function DocPage() {
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [isInCall, setIsInCall] = useState(false);
  const [appointmentCode, setAppointmentCode] = useState('');

  const filteredDoctors = selectedSpecialization
    ? doctors.filter(doctor => doctor.specialization === selectedSpecialization)
    : doctors;

  const handleBookingComplete = (newAppointment) => {
    setAppointment(newAppointment);
    setSelectedDoctor(null);
  };

  const handleAppointmentLookup = (e) => {
    e.preventDefault();
    // In a real app, this would fetch from an API
    console.log('Looking up appointment:', appointmentCode);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isInCall ? (
        <VideoCall onEnd={() => setIsInCall(false)} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Doctor Appointment System</h1>
            
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Specializations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              
              <form onSubmit={handleAppointmentLookup} className="flex-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={appointmentCode}
                    onChange={(e) => setAppointmentCode(e.target.value)}
                    placeholder="Enter appointment code"
                    className="flex-1 p-2 border rounded-md"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>
            </div>
          </header>

          {appointment ? (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4">Appointment Confirmed!</h2>
              <div className="space-y-2">
                <p><strong>Appointment Code:</strong> {appointment.appointmentCode}</p>
                <p><strong>Patient:</strong> {appointment.patientName}</p>
                <p><strong>Time:</strong> {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setIsInCall(true)}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  <Video size={20} />
                  Join Video Call
                </button>
                <button
                  onClick={() => setAppointment(null)}
                  className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                  <Calendar size={20} />
                  Book Another
                </button>
              </div>
            </div>
          ) : selectedDoctor ? (
            <AppointmentBooking
              doctor={selectedDoctor}
              onBookingComplete={handleBookingComplete}
              onCancel={() => setSelectedDoctor(null)}
            />
          ) : (
            <DoctorList
              doctors={filteredDoctors}
              onSelectDoctor={setSelectedDoctor}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DocPage;