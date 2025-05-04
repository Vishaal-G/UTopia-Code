import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function EventMarker({ event }) {
  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: '/marker-icon.png', // Make sure to add your marker icon in public folder
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <Marker 
      position={[event.latitude, event.longitude]} 
      icon={customIcon}
    >
      <Popup>
        <div className="event-popup">
          <h3>{event.title}</h3>
          {event.image && (
            <img 
              src={event.image} 
              alt={event.title} 
              style={{ width: '200px', height: 'auto' }}
            />
          )}
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Faculty:</strong> {event.faculty}</p>
          <p>{event.description}</p>
          <button 
            onClick={() => window.location.href = `/event/${event.id}`}
            className="view-more-btn"
          >
            View More
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

export default EventMarker;