import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

async function searchNearbyHospitals(center) {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:5000,${center[0]},${center[1]});
      way["amenity"="hospital"](around:5000,${center[0]},${center[1]});
      relation["amenity"="hospital"](around:5000,${center[0]},${center[1]});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    });
    const data = await response.json();
    return data.elements
      .filter((element) => element.type === 'node' && element.tags && element.tags.name)
      .map((element) => ({
        name: element.tags.name,
        position: [element.lat, element.lon],
        id: element.id.toString(),
      }));
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return [];
  }
}

export default function Map({ center, onHospitalsUpdate }) {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    searchNearbyHospitals(center).then((newHospitals) => {
      setHospitals(newHospitals);
      onHospitalsUpdate(newHospitals);
    });
  }, [center, onHospitalsUpdate]);

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={center} />
      
      {hospitals.map((hospital) => (
        <Marker key={hospital.id} position={hospital.position}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{hospital.name}</h3>
              <a
                href={`https://www.openstreetmap.org/directions?from=${center[0]},${center[1]}&to=${hospital.position[0]},${hospital.position[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}