// Navbar.jsx
// Save in: src/components/Navbar.jsx
import './Navbar.css';

function Navbar({ airportName, activePage, setActivePage }) {
  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <header className="header">
      <div className="airport-name">{airportName}</div>
      <nav className="navigation">
        <ul className="nav-list">
          <li 
            className={`nav-item ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            HOME
          </li>
          <li 
            className={`nav-item ${activePage === 'airplanes' ? 'active' : ''}`}
            onClick={() => handleNavClick('airplanes')}
          >
            AIRPLANES
          </li>
          <li 
            className={`nav-item ${activePage === 'flights' ? 'active' : ''}`}
            onClick={() => handleNavClick('flights')}
          >
            FLIGHTS
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;