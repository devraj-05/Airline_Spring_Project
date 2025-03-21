// Navbar.jsx
// Save in: src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ airportName }) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <header className="header">
      <div className="airport-name">{airportName}</div>
      <nav className="navigation">
        <ul className="nav-list">
          <li className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>
            <Link to="/" className="nav-link">HOME</Link>
          </li>
          <li className={`nav-item ${currentPath === '/airplanes' ? 'active' : ''}`}>
            <Link to="/airplanes" className="nav-link">AIRPLANES</Link>
          </li>
          <li className={`nav-item ${currentPath === '/flights' ? 'active' : ''}`}>
            <Link to="/flights" className="nav-link">FLIGHTS</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;