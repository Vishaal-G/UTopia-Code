import React, { useEffect, useState, useCallback } from 'react';
import { getUniqueFacultyTypes, fetchLocations } from './locationFilter';

function Sidebar({ isOpen, onFilter, onFacultyChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [locations, setLocations] = useState([]);

  const debouncedFilter = useCallback(
    (searchValue, facultyValue) => {
      const timeoutId = setTimeout(() => {
        onFilter(searchValue, facultyValue);
      }, 100);
      return () => clearTimeout(timeoutId);
    },
    [onFilter]
  );

  useEffect(() => {
    debouncedFilter(searchTerm, selectedFaculty);
  }, [searchTerm, selectedFaculty, debouncedFilter]);

  useEffect(() => {
    fetchLocations().then(fetchedLocations => {
      setLocations(fetchedLocations);
    }).catch(error => {
      console.error('Error fetching locations:', error);
    });
  }, []);

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedFilter(newSearchTerm, selectedFaculty);
  };

  const handleFacultyChange = (e) => {
    const newFaculty = e.target.value;
    const facultyToFilter = newFaculty === "" ? "All" : newFaculty;
    setSelectedFaculty(facultyToFilter);
    debouncedFilter(searchTerm, facultyToFilter);
    onFacultyChange(facultyToFilter);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <h2>Search Events</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedFaculty} onChange={handleFacultyChange}>
          <option value="All">Select Faculty</option>
          {getUniqueFacultyTypes(locations).map(faculty => (
            <option key={faculty} value={faculty}>{faculty}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Sidebar; 