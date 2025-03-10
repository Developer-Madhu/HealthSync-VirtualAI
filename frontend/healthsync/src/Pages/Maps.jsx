import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import SearchBox from '../Components/SearchBox';
import Map from '../Components/Map';
import HospitalLists from '../Components/HospitalLists';

function Maps() {
  const [center, setCenter] = useState([28.6139, 77.2090]); // Default to New Delhi
  const [hospitals, setHospitals] = useState([]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">HealthSync Hospital Finder</h1>
          </div>
          <SearchBox onLocationSelect={setCenter} />
        </div>
      </header>

      <main className="flex-1 flex">
        <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
          <HospitalLists hospitals={hospitals} center={center} />
        </div>
        <div className="flex-1">
          <Map center={center} onHospitalsUpdate={setHospitals} />
        </div>
      </main>
    </div>
  );
}

export default Maps;