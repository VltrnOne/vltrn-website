import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ParticleBackground from './components/ParticleBackground';
import AIChatbot from './components/AIChatbot';
import AIFormAssistant from './components/AIFormAssistant';
import Home from './pages/Home';
import About from './pages/About';
import Onboarding from './pages/Onboarding';
import Partners from './pages/Partners';
import Community from './pages/Community';
import BusinessFunding from './pages/BusinessFunding';
import GlobalExpansion from './pages/GlobalExpansion';
import ProductDevelopment from './pages/ProductDevelopment';
import PerformanceAnalytics from './pages/PerformanceAnalytics';
import ClientIntakePage from './pages/ClientIntakePage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';
import ResourcesPage from './pages/ResourcesPage';
import APITestPage from './pages/APITestPage';
import AuthGuard from './components/guards/AuthGuard';
import VerificationCallback from './components/auth/VerificationCallback';
import DebugPanel from './components/DebugPanel';
import ConceptDevelopment from './pages/chat/ConceptDevelopment';
import Prototyping from './pages/chat/Prototyping';
import DesignEngineering from './pages/chat/design-engineering';
import LaunchStrategy from './pages/chat/launch-strategy';

function App() {
  const [isAIChatbotOpen, setIsAIChatbotOpen] = useState(false);
  const [isAIFormAssistantOpen, setIsAIFormAssistantOpen] = useState(false);

  const handleAIChatbotToggle = () => {
    setIsAIChatbotOpen(!isAIChatbotOpen);
  };

  const handleAIFormAssistantToggle = () => {
    setIsAIFormAssistantOpen(!isAIFormAssistantOpen);
  };

  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-radial from-[#0A0A0A] to-black">
        <ParticleBackground />
        <Header 
          onAIChatbotToggle={handleAIChatbotToggle}
          onAIFormAssistantToggle={handleAIFormAssistantToggle}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/onboarding" element={
            <AuthGuard>
              <Onboarding />
            </AuthGuard>
          } />
          <Route path="/partners" element={<Partners />} />
          <Route path="/community" element={<Community />} />
          <Route path="/business-funding" element={<BusinessFunding />} />
          <Route path="/global-expansion" element={<GlobalExpansion />} />
          <Route path="/product-development" element={<ProductDevelopment />} />
          <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
          <Route path="/client-intakes" element={
            <AuthGuard>
              <ClientIntakePage />
            </AuthGuard>
          } />
          <Route path="/projects" element={
            <AuthGuard>
              <ProjectsPage />
            </AuthGuard>
          } />
          <Route path="/tasks" element={
            <AuthGuard>
              <TasksPage />
            </AuthGuard>
          } />
          <Route path="/resources" element={
            <AuthGuard>
              <ResourcesPage />
            </AuthGuard>
          } />
          <Route path="/api-test" element={<APITestPage />} />
          <Route path="/auth/callback" element={<VerificationCallback />} />
          <Route path="/chat/concept-development" element={<ConceptDevelopment />} />
          <Route path="/chat/prototyping" element={<Prototyping />} />
          <Route path="/chat/design-engineering" element={<DesignEngineering />} />
          <Route path="/chat/launch-strategy" element={<LaunchStrategy />} />
        </Routes>
        
        {/* AI Components */}
        <AIChatbot
          isOpen={isAIChatbotOpen}
          onClose={() => setIsAIChatbotOpen(false)}
          onMinimize={() => setIsAIChatbotOpen(false)}
        />
        
        {/* Debug Panel - only visible in development */}
        {import.meta.env.DEV && <DebugPanel />}
      </div>
    </Router>
  );
}

export default App;