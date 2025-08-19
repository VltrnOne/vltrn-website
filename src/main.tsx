import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('🔥 VLTRN Main.tsx is loading...');

const rootElement = document.getElementById('root');
console.log('📍 Root element found:', rootElement);

if (rootElement) {
  console.log('🚀 Creating React root...');
  const root = createRoot(rootElement);
  
  console.log('🎯 Rendering App component...');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('✅ App rendered successfully!');
} else {
  console.error('❌ Root element not found!');
}
