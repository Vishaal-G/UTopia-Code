import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import './App.css';

// Define a custom icon with the correct path
const customIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/marker icons/individualIcons/54.png', 
  iconSize: [41, 41],
});

function App() {
  const [map, setMap] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    console.log('App component mounted');
    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    const mapInstance = L.map('map', {
      zoomControl: false
    }).setView([43.6623, -79.3953], 17);
    setMap(mapInstance);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance);

    L.control.zoom({
      position: 'bottomright'
    }).addTo(mapInstance);
    return () => {
      mapInstance.remove();
    };
  }, []);

  const fetchMarkers = (term, faculty) => {
    console.log('Fetching markers with search term:', term, 'and faculty:', faculty);
    const requestUrl = `http://localhost:5000/markers?search=${term}&faculty=${faculty}`;
    console.log('Requesting:', requestUrl);
    axios.get(requestUrl)
      .then(response => {
        console.log('Markers received:', response.data);
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });
        response.data.forEach(marker => {
          if (!faculty || faculty === "All" || marker.faculty_type.toLowerCase() === faculty.toLowerCase()) {
            const popupContent = `<b>${marker.popup_text}</b><br>Type: ${marker.faculty_type}`;
            L.marker([marker.latitude, marker.longitude], { icon: customIcon })
              .addTo(map)
              .bindPopup(popupContent);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching markers:', error);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button onClick={toggleSidebar} className="toggle-sidebar-btn">
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>

      <div id="map" style={{ height: '100vh' }}></div>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onFilter={fetchMarkers} 
        onSearchChange={fetchMarkers}
        onFacultyChange={fetchMarkers}
      />
    </div>
  );
}

export default App; 