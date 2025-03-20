// Airplanes.jsx
// Save in: src/pages/Airplanes.jsx
import { useState, useEffect } from 'react';
import './Airplanes.css';

function Airplanes() {
  const [airplanes, setAirplanes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newAirplane, setNewAirplane] = useState({
    name: '',
    capacity: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all airplanes from the backend
  const fetchAirplanes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/airplane');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAirplanes(data);
    } catch (error) {
      console.error("Error fetching airplanes:", error);
      setError("Failed to load airplanes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch airplanes on component mount
  useEffect(() => {
    fetchAirplanes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAirplane({
      ...newAirplane,
      [name]: value
    });
  };

  const resetForm = () => {
    setNewAirplane({ name: '', capacity: '' });
    setEditMode(false);
    setShowForm(false);
  };

  const handleEdit = (airplane) => {
    setNewAirplane({
      a_id: airplane.a_id,
      name: airplane.name,
      capacity: airplane.capacity
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this airplane?")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/airplane/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Refresh the airplane list
      fetchAirplanes();
    } catch (error) {
      console.error("Error deleting airplane:", error);
      alert("Failed to delete the airplane. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!newAirplane.name || !newAirplane.capacity) {
      alert("Please fill in all required fields");
      return;
    }
    
    try {
      // Format the data to match backend expectations
      const airplaneData = {
        ...newAirplane,
        capacity: parseInt(newAirplane.capacity)
      };
      
      // Determine if this is an update or a new airplane
      const url = '/api/airplane';
      const method = editMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airplaneData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Refresh the airplane list
      fetchAirplanes();
      
      // Reset the form
      resetForm();
    } catch (error) {
      console.error("Error saving airplane:", error);
      alert("Failed to save the airplane. Please try again.");
    }
  };

  return (
    <div className="airplanes-page">
      <h1>Manage Airplanes</h1>
      
      {!showForm ? (
        <div className="add-button-container">
          <button 
            className="add-airplane-button" 
            onClick={() => setShowForm(true)}
          >
            Add Airplane
          </button>
        </div>
      ) : (
        <div className="form-container">
          <h2>{editMode ? 'Edit Airplane' : 'Add New Airplane'}</h2>
          <form onSubmit={handleSubmit}>
            {editMode && (
              <div className="form-group">
                <label htmlFor="a_id">Airplane ID:</label>
                <input
                  type="text"
                  id="a_id"
                  value={newAirplane.a_id}
                  disabled
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">Airplane Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newAirplane.name}
                onChange={handleInputChange}
                placeholder="e.g. Boeing 737-800"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="capacity">Passenger Capacity:</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={newAirplane.capacity}
                onChange={handleInputChange}
                placeholder="e.g. 180"
                required
                min="1"
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                {editMode ? 'Update Airplane' : 'Save Airplane'}
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {loading && <p className="loading-message">Loading airplanes...</p>}
      
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && airplanes.length > 0 ? (
        <div className="airplane-list">
          <h2>Available Airplanes</h2>
          <table className="airplanes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {airplanes.map(airplane => (
                <tr key={airplane.a_id}>
                  <td>{airplane.a_id}</td>
                  <td>{airplane.name}</td>
                  <td>{airplane.capacity}</td>
                  <td>
                    <button 
                      className="action-button edit"
                      onClick={() => handleEdit(airplane)}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-button delete"
                      onClick={() => handleDelete(airplane.a_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && !error ? (
        <p className="no-data-message">No airplanes available. Add your first airplane!</p>
      ) : null}
    </div>
  );
}

export default Airplanes;