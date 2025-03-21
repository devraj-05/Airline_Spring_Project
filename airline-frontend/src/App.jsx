// App.jsx
// Save in: src/App.jsx
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Airplanes from './pages/Airplanes';
import Flights from './pages/Flights';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const airportName = "Skyline International Airport";
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar airportName={airportName} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/airplanes" element={<Airplanes />} />
            <Route path="/flights" element={<Flights />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
  
};

export default App;