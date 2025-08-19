import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  console.log('🚀 App component is rendering...');
  
  return (
    <Router>
      <div style={{ 
        color: '#FE02A1', 
        background: '#0A0A0A', 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px'
      }}>
        <Header />
        
        <div style={{ paddingTop: '80px' }}>
          <div style={{ 
            padding: '40px', 
            color: '#FE02A1'
          }}>
            <h1 style={{ color: '#FE02A1', marginBottom: '20px' }}>
              🎯 VLTRN PLATFORM - WORKING VERSION
            </h1>
            
            <div style={{ 
              background: 'rgba(254, 2, 161, 0.1)', 
              border: '2px solid #FE02A1', 
              padding: '20px', 
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <h2>✅ SUCCESS!</h2>
              <p>React is working perfectly!</p>
              <p>Now adding back components one by one...</p>
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;