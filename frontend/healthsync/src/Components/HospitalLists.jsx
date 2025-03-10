import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function HospitalLists({ hospitals, center }) {
  const sortedHospitals = [...hospitals].sort((a, b) => {
    const distA = calculateDistance(center[0], center[1], a.position[0], a.position[1]);
    const distB = calculateDistance(center[0], center[1], b.position[0], b.position[1]);
    return distA - distB;
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-600" />
        Nearby Hospitals ({hospitals.length})
      </h2>
      <div className="space-y-4">
        {sortedHospitals.map((hospital) => {
          const distance = calculateDistance(
            center[0],
            center[1],
            hospital.position[0],
            hospital.position[1]
          );

          return (
            <div
              key={hospital.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {distance.toFixed(1)} km away
                </span>
                <a
                  href={`https://www.openstreetmap.org/directions?from=${center[0]},${center[1]}&to=${hospital.position[0]},${hospital.position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Navigation className="h-4 w-4" />
                  Directions
                </a>
              </div>
            </div>
          );
        })}
        {hospitals.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No hospitals found in this area
          </div>
        )}
      </div>
    </div>
  );
}