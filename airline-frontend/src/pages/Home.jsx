// Home.jsx
// Save in: src/pages/Home.jsx
import './Home.css';
import airportImage from '../assets/airport.jpg';

function Home({ airportName }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <img src={airportImage} alt="Airport" className="airport-image" />
        <h1>Welcome to Skyline International Airport{airportName}</h1>
      </div>
      
      <section className="about-section">
        <h2>About Our Airport</h2>
        <p>
          Skyline International Airport is a premier transportation hub serving millions of passengers annually. 
          Established in 1985, our airport has grown to become one of the most efficient and passenger-friendly 
          airports in the region.
        </p>
        <p>
          With state-of-the-art facilities, multiple terminals, and connections to over 150 destinations worldwide, 
          we pride ourselves on providing exceptional service to travelers and airlines alike.
        </p>
        <p>
          Our mission is to connect people and places safely, efficiently, and with the highest standards of 
          customer service. We're committed to sustainable operations and continuous improvement to enhance 
          the travel experience.
        </p>
      </section>
    </div>
  );
}

export default Home;