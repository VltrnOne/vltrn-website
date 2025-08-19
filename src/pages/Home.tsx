import React from 'react';
import Hero from '../components/Hero';

const Home = () => {
  console.log('🚀 Home page is rendering...');

  return (
    <div>
      <Hero />
      
      <div style={{ 
        padding: '40px', 
        background: 'rgba(0, 255, 0, 0.1)', 
        border: '2px solid #00ff00', 
        borderRadius: '10px',
        margin: '40px'
      }}>
        <h2 style={{ color: '#00ff00', marginBottom: '15px' }}>
          🏠 HOME PAGE - WORKING!
        </h2>
        
        <p style={{ color: 'white', marginBottom: '15px' }}>
          This is a simple working Home page with Hero component added.
        </p>

        <div style={{ 
          background: 'rgba(254, 2, 161, 0.1)', 
          border: '2px solid #FE02A1', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '15px'
        }}>
          <h3 style={{ color: '#FE02A1', marginBottom: '10px' }}>
            🎯 Next Steps:
          </h3>
          <ul style={{ color: 'white', marginLeft: '20px' }}>
            <li>✅ React Router working</li>
            <li>✅ Home page loading</li>
            <li>✅ Header component working</li>
            <li>🔄 Hero component added - testing buttons</li>
            <li>🔄 Adding forms next</li>
          </ul>
        </div>

        <button 
          onClick={() => alert('Home page button works!')}
          style={{
            padding: '10px 20px',
            background: '#FE02A1',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Test Home Button
        </button>
      </div>
    </div>
  );
};

export default Home;