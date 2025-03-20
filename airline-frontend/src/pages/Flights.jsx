// Flights.jsx
// Save in: src/pages/Flights.jsx
import { useState } from 'react';
import './Flights.css';

function Flights() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const flights = [
    { id: "SK103", destination: "New York", departure: "08:30", status: "On Time", gate: "A12", airline: "SkyWest" },
    { id: "DL456", destination: "London", departure: "09:45", status: "Delayed", gate: "B5", airline: "Delta" },
    { id: "UA789", destination: "Tokyo", departure: "11:15", status: "Boarding", gate: "C7", airline: "United" },
    { id: "AA234", destination: "Paris", departure: "12:30", status: "On Time", gate: "D3", airline: "American" },
    { id: "QR908", destination: "Dubai", departure: "14:00", status: "On Time", gate: "E9", airline: "Qatar Airways" },
    { id: "BA567", destination: "Sydney", departure: "16:45", status: "Delayed", gate: "F2", airline: "British Airways" },
  ];

  const filteredFlights = flights.filter(flight => 
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flights-page">
      <h1>Flight Information</h1>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by destination, airline, or flight number" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="flights-container">
        <table className="flights-table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Status</th>
              <th>Gate</th>
              <th>Airline</th>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.map(flight => (
              <tr key={flight.id} className={flight.status === "Delayed" ? "delayed" : ""}>
                <td>{flight.id}</td>
                <td>{flight.destination}</td>
                <td>{flight.departure}</td>
                <td className={`status ${flight.status.toLowerCase().replace(" ", "-")}`}>
                  {flight.status}
                </td>
                <td>{flight.gate}</td>
                <td>{flight.airline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Flights;