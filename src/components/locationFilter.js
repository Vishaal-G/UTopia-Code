import axios from 'axios';

async function fetchLocations() {
    const response = await axios.get('http://localhost:5000/markers');
    const locations = response.data;
    console.log('Fetched locations:', locations);   
    return locations;
}

const getUniqueFacultyTypes = (fetchedLocations) => {
    return [...new Set(fetchedLocations.map(location => location.faculty_type))];
}

const getUniqueEventTypes = (fetchedLocations) => {
    return [...new Set(fetchedLocations.map(location => location.type))];
}

export { getUniqueFacultyTypes, getUniqueEventTypes, fetchLocations};

