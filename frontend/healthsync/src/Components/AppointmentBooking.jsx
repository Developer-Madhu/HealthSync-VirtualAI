import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export const AppointmentBooking = ({ doctor, onBookingComplete, onCancel }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    const appointment = {
      id: uuidv4(),
      doctorId: doctor.id,
      patientName,
      date: format(new Date(), 'yyyy-MM-dd'),
      timeSlot: selectedSlot,
      symptoms,
      appointmentCode: uuidv4().slice(0, 8).toUpperCase(),
      status: 'scheduled'
    };

    onBookingComplete(appointment);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Book Appointment with {doctor.name}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Available Time Slots
          </label>
          <div className="grid grid-cols-3 gap-3">
            {doctor.availableSlots
              .filter(slot => !slot.isBooked)
              .map(slot => (
                <button
                  key={slot.id}
                  type="button"
                  className={`p-2 text-sm rounded-md border ${
                    selectedSlot?.id === slot.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Patient Name
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Symptoms
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!selectedSlot}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Book Appointment
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};