import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      color: 'white', 
      background: '#0A0A0A', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🎯 VLTRN Platform - Minimal Test</h1>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        border: '2px solid #FE02A1',
        borderRadius: '10px'
      }}>
        <h2>✅ React is Working!</h2>
        <p>If you can see this, React is mounting correctly.</p>
        <p>The issue is likely in one of the imported components.</p>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        border: '2px solid #00ff00',
        borderRadius: '10px'
      }}>
        <h2>🔍 Debug Info</h2>
        <p>Current URL: {window.location.href}</p>
        <p>User Agent: {navigator.userAgent}</p>
        <p>Local Storage Token: {localStorage.getItem('vltrn_token') ? 'Present' : 'Missing'}</p>
        <p>Local Storage User: {localStorage.getItem('vltrn_user') ? 'Present' : 'Missing'}</p>
      </div>
      
      <button 
        onClick={() => alert('JavaScript is working!')}
        style={{
          background: '#FE02A1',
          color: 'white',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Test JavaScript
      </button>
    </div>
  );
}

export default App;
