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
    a_id: { id: '' },
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
      console.log('Airplane data:', data); // For debugging
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
      // Updated to use a_id instead of id
      setFlightData({ ...flightData, a_id: { a_id: value } });
    } else {
      setFlightData({ ...flightData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Determine if this is an update or a new flight
      const url = '/api/flights';
      const method = editMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      });
      
      if (!response.ok) {
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
    // Convert database time format to input time format (HH:MM)
    const formatTime = (timeString) => {
      if (!timeString) return '';
      const date = new Date(timeString);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    // Format date for the form
    const formatDate = (dateString) => {
      if (!dateString) return currentDate;
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    // Updated to use a_id instead of id
    setFlightData({
      f_id: flight.f_id,
      a_id: { a_id: flight.a_id?.a_id || '' },
      dept_city: flight.dept_city || '',
      dest_city: flight.dest_city || '',
      flight_date: formatDate(flight.flight_date),
      dept_time: formatTime(flight.dept_time),
      dest_time: formatTime(flight.dest_time),
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
      a_id: { a_id: '' }, // Updated to use a_id instead of id
      dept_city: '',
      dest_city: '',
      flight_date: currentDate,
      dept_time: '',
      dest_time: '',
      price: ''
    });
    setEditMode(false);
  };

  // Filter flights based on search term - updated to match your data structure
  const filteredFlights = flights.filter(flight => 
    (flight.dest_city && flight.dest_city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (flight.dept_city && flight.dept_city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (flight.a_id && flight.a_id.name && flight.a_id.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  return (
    <div className="flights-page">
      <h1>Flight Information</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by destination, departure city, or airline"
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
                    {airplane.name} - Capacity: {airplane.capacity}
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
          <p>No flights available.</p>
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
                  <td>{flight.a_id ? `${flight.a_id.name} - Capacity: ${flight.a_id.capacity}` : 'N/A'}</td>
                  <td>{flight.dept_city}</td>
                  <td>{flight.dest_city}</td>
                  <td>{new Date(flight.flight_date).toLocaleDateString()}</td>
                  <td>{new Date(flight.dept_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                  <td>{new Date(flight.dest_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
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