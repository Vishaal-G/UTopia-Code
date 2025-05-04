// MapComponent.js
import React, { useState, useEffect } from 'react';
import dynamoDB from './aws-config';  // Import your DynamoDB configuration

const MapComponent = () => {
  const [locations, setLocations] = useState([]);  // State to store fetched data

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        TableName: 'UTopia-Events',  // Replace with your DynamoDB table name
      };

      try {
        // Perform scan operation to fetch all items from the table
        const data = await dynamoDB.scan(params).promise();

        // Test to see if data is fetched
        console.log('Fetched data', data.Items);
        
        // Set the fetched data to state
        setLocations(data.Items);  // DynamoDB items are returned in data.Items
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();  // Call fetchData on component mount
  }, []);  // Empty dependency array means this runs once when the component is mounted

  return (
    <div>
      <h1>Locations from DynamoDB</h1>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>
            Latitude: {location.eventLatitude}, Longitude: {location.eventLongitude}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;
