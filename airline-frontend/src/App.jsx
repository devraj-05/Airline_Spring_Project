// App.jsx
// Save in: src/App.jsx
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Airplanes from './pages/Airplanes';
import Flights from './pages/Flights';

function App() {
  const [activePage, setActivePage] = useState('home');
  const airportName = "Skyline International Airport";

  const renderPage = () => {
    switch(activePage) {
      case 'home':
        return <Home airportName={airportName} />;
      case 'airplanes':
        return <Airplanes />;
      case 'flights':
        return <Flights />;
      default:
        return <Home airportName={airportName} />;
    }
  };

  return (
    <div className="app">
      <Navbar 
        airportName={airportName} 
        activePage={activePage} 
        setActivePage={setActivePage} 
      />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;