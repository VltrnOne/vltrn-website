import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Resources from './pages/Resources';
import ClientIntakePage from './pages/ClientIntakePage';
import APITestPage from './pages/APITestPage';
import VerificationCallback from './pages/VerificationCallback';
import AuthGuard from './components/AuthGuard';

function App() {
  console.log('🚀 VLTRN Platform - Production Version Loading...');
  
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/client-intakes" element={<ClientIntakePage />} />
            <Route path="/api-test" element={<APITestPage />} />
            <Route path="/verification-callback" element={<VerificationCallback />} />
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;