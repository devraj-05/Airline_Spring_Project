import { useState, useEffect } from 'react';
import './Flights.css';

function Flights() {
  const [searchTerm, setSearchTerm] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [airplanes, setAirplanes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  // Form state
  const [flightData, setFlightData] = useState({
    f_id: 0,
    a_id: { a_id: '' },
    dept_city: '',
    dest_city: '',
    flight_date: currentDate,
    dept_time: '',
    dest_time: '',
    price: ''
  });

  // Fetch flights data
  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/flights');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setFlights(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setError('Failed to load flights. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch airplanes data for the dropdown
  const fetchAirplanes = async () => {
    try {
      const response = await fetch('/api/airplane');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setAirplanes(data);
    } catch (error) {
      console.error('Error fetching airplanes:', error);
    }
  };

  useEffect(() => {
    fetchFlights();
    fetchAirplanes();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'a_id') {
      setFlightData({ ...flightData, a_id: { a_id: value } });
    } else {
      setFlightData({ ...flightData, [name]: value });
    }
  };

  // Format time for java.sql.Time (HH:MM:SS)
  const formatTimeForJava = (timeString) => {
    if (!timeString) return null;
    return `${timeString}:00`;
  };

  // Format time string from backend for display
  const formatTimeForDisplay = (timeString) => {
    if (!timeString) return 'N/A';
    
    // Check if timeString is in the format "HH:MM:SS"
    if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
      return timeString.substring(0, 5); // Return HH:MM
    }
    
    try {
      // For date objects or ISO strings
      const date = new Date(`1970-01-01T${timeString}`);
      if (isNaN(date.getTime())) {
        // If still invalid, try parsing the time portion
        const timeParts = timeString.split(':');
        if (timeParts.length >= 2) {
          return `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`;
        }
        return 'Invalid Time';
      }
      return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } catch (e) {
      console.error('Error formatting time:', e);
      return 'Invalid Time';
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a copy of the flight data for submission
      const submissionData = { ...flightData };
      
      // Format times for java.sql.Time
      submissionData.dept_time = formatTimeForJava(submissionData.dept_time);
      submissionData.dest_time = formatTimeForJava(submissionData.dest_time);
      
      // Determine if this is an update or a new flight
      const url = '/api/flights';
      const method = editMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Refresh the flights list and reset the form
      fetchFlights();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving flight:', error);
      setError('Failed to save flight. Please try again.');
    }
  };

  // Handle edit button click
  const handleEdit = (flight) => {
    // Extract time from time string (could be in various formats)
    const extractTime = (timeString) => {
      if (!timeString) return '';
      
      // If it's already in HH:MM or HH:MM:SS format
      if (typeof timeString === 'string' && /^\d{1,2}:\d{1,2}(:\d{1,2})?$/.test(timeString)) {
        return timeString.substring(0, 5); // Return just HH:MM
      }
      
      try {
        // Try parsing as a date
        const date = new Date(`1970-01-01T${timeString}`);
        if (!isNaN(date.getTime())) {
          return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
        
        // If the above fails, try extracting from the time string
        const timeParts = timeString.toString().split(':');
        if (timeParts.length >= 2) {
          return `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`;
        }
        
        return '';
      } catch (e) {
        console.error('Error extracting time:', e);
        return '';
      }
    };

    // Format date for the form
    const formatDate = (dateString) => {
      if (!dateString) return currentDate;
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return currentDate;
        return date.toISOString().split('T')[0];
      } catch (e) {
        return currentDate;
      }
    };

    setFlightData({
      f_id: flight.f_id,
      a_id: { a_id: flight.a_id?.a_id || '' },
      dept_city: flight.dept_city || '',
      dest_city: flight.dest_city || '',
      flight_date: formatDate(flight.flight_date),
      dept_time: extractTime(flight.dept_time),
      dest_time: extractTime(flight.dest_time),
      price: flight.price || ''
    });
    
    setEditMode(true);
    setShowForm(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        const response = await fetch(`/api/flights/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Refresh the flights list
        fetchFlights();
      } catch (error) {
        console.error('Error deleting flight:', error);
        setError('Failed to delete flight. Please try again.');
      }
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFlightData({
      f_id: 0,
      a_id: { a_id: '' },
      dept_city: '',
      dest_city: '',
      flight_date: currentDate,
      dept_time: '',
      dest_time: '',
      price: ''
    });
    setEditMode(false);
  };

  // Filter flights based on search term - FIXED FUNCTION for city search only
  const filteredFlights = flights.filter(flight => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    // If search term is empty, return all flights
    if (!searchTermLower) return true;
    
    // Check destination city
    const destCityMatch = flight.dest_city && 
      flight.dest_city.toLowerCase().includes(searchTermLower);
    
    // Check departure city
    const deptCityMatch = flight.dept_city && 
      flight.dept_city.toLowerCase().includes(searchTermLower);
    
    return destCityMatch || deptCityMatch;
  });

  // Display loading state
  if (loading && flights.length === 0) {
    return (
      <div className="flights-page">
        <h1>Flight Information</h1>
        <p>Loading flight data...</p>
      </div>
    );
  }

  // Display error state
  if (error && flights.length === 0) {
    return (
      <div className="flights-page">
        <h1>Flight Information</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  // Find the matching airplane info for display
  const getAirplaneInfo = (airplaneId) => {
    if (!airplaneId || !airplaneId.a_id) return 'N/A';
    const airplane = airplanes.find(a => a.a_id.toString() === airplaneId.a_id.toString());
    if (airplane) {
      return `${airplane.name || 'Unknown'} - Capacity: ${airplane.capacity || 'N/A'}`;
    }
    return `ID: ${airplaneId.a_id}`;
  };

  return (
    <div className="flights-page">
      <h1>Flight Information</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by destination or departure city"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="add-flight-container">
        <button 
          className="add-flight-btn"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Add Flight'}
        </button>
      </div>
      
      {showForm && (
        <div className="flight-form-container">
          <h2>{editMode ? 'Edit Flight' : 'Add New Flight'}</h2>
          <form onSubmit={handleSubmit} className="flight-form">
            <div className="form-group">
              <label htmlFor="a_id">Airplane:</label>
              <select 
                id="a_id" 
                name="a_id" 
                value={flightData.a_id.a_id} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select an airplane</option>
                {airplanes.map(airplane => (
                  <option key={airplane.a_id} value={airplane.a_id}>
                    {airplane.name ? `${airplane.name} - Capacity: ${airplane.capacity}` : `ID: ${airplane.a_id}`}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="dept_city">Departure City:</label>
              <input 
                type="text" 
                id="dept_city" 
                name="dept_city" 
                value={flightData.dept_city} 
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dest_city">Destination City:</label>
              <input 
                type="text" 
                id="dest_city" 
                name="dest_city" 
                value={flightData.dest_city} 
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="flight_date">Flight Date:</label>
              <input 
                type="date" 
                id="flight_date" 
                name="flight_date" 
                value={flightData.flight_date} 
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dept_time">Departure Time:</label>
              <input 
                type="time" 
                id="dept_time" 
                name="dept_time" 
                value={flightData.dept_time} 
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dest_time">Arrival Time:</label>
              <input 
                type="time" 
                id="dest_time" 
                name="dest_time" 
                value={flightData.dest_time} 
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                value={flightData.price} 
                onChange={handleInputChange}
                min="0" 
                step="0.01"
                required
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                {editMode ? 'Update Flight' : 'Add Flight'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="flights-container">
        {filteredFlights.length === 0 ? (
          <p>No flights available matching your search.</p>
        ) : (
          <table className="flights-table">
            <thead>
              <tr>
                <th>Flight ID</th>
                <th>Airplane</th>
                <th>Departure</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map(flight => (
                <tr key={flight.f_id}>
                  <td>{flight.f_id}</td>
                  <td>{getAirplaneInfo(flight.a_id)}</td>
                  <td>{flight.dept_city}</td>
                  <td>{flight.dest_city}</td>
                  <td>{new Date(flight.flight_date).toLocaleDateString()}</td>
                  <td>{formatTimeForDisplay(flight.dept_time)}</td>
                  <td>{formatTimeForDisplay(flight.dest_time)}</td>
                  <td>${parseFloat(flight.price).toFixed(2)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEdit(flight)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(flight.f_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Flights;