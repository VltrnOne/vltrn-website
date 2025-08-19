import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Onboarding from './pages/Onboarding';
import Partners from './pages/Partners';
import Community from './pages/Community';
import BusinessFunding from './pages/BusinessFunding';
import GlobalExpansion from './pages/GlobalExpansion';
import ProductDevelopment from './pages/ProductDevelopment';
import PerformanceAnalytics from './pages/PerformanceAnalytics';
import ClientIntakePage from './pages/ClientIntakePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import APITestPage from './pages/APITestPage.jsx';
import Dashboard from './pages/Dashboard';
import AuthGuard from './components/guards/AuthGuard';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-radial from-[#0A0A0A] to-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/community" element={<Community />} />
          <Route path="/business-funding" element={<BusinessFunding />} />
          <Route path="/global-expansion" element={<GlobalExpansion />} />
          <Route path="/product-development" element={<ProductDevelopment />} />
          <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
          <Route path="/client-intakes" element={<AuthGuard><ClientIntakePage /></AuthGuard>} />
          <Route path="/projects" element={<AuthGuard><ProjectsPage /></AuthGuard>} />
          <Route path="/tasks" element={<AuthGuard><TasksPage /></AuthGuard>} />
          <Route path="/resources" element={<AuthGuard><ResourcesPage /></AuthGuard>} />
          <Route path="/api-test" element={<APITestPage />} />
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
