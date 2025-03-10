import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBox({ onLocationSelect }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchLocation = async (query) => {
    if (!query) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in`
      );
      const data = await response.json();
      setSuggestions(data);
      setIsOpen(true);
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleSelect = (lat, lon, displayName) => {
    onLocationSelect([lat, lon]);
    setValue(displayName.split(',').slice(0, 2).join(','));
    setIsOpen(false);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            searchLocation(e.target.value);
          }}
          placeholder="Search for a location in India..."
          className="w-full px-4 py-2 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg">
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => {
                handleSelect(parseFloat(place.lat), parseFloat(place.lon), place.display_name);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}