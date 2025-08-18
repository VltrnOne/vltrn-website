import React, { useState } from 'react';
import { MessageSquare, Users, Trophy, Bell, Search, Send, Plus, Heart, MessageCircle, Flag, Building2, TrendingUp } from 'lucide-react';
import ChatRoom from '../components/community/ChatRoom';
import ResourceLibrary from '../components/community/ResourceLibrary';
import AnalyticsDashboard from '../components/community/AnalyticsDashboard';
import KPICard from '../components/dashboard/KPICard';
import TaskBoard from '../components/dashboard/TaskBoard';
import ProjectTracking from '../components/dashboard/ProjectTracking';
import DeliverablesList from '../components/dashboard/DeliverablesList';
import SharedResources from '../components/dashboard/SharedResources';
import ProjectProgressChart from '../components/community/ProjectProgressChart';
import SharedResourceManager from '../components/community/SharedResourceManager';

const Community = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen pt-24">
      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 border-b border-[rgba(254,2,161,0.3)]">
          {['overview', 'analytics', 'projects', 'resources'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-white capitalize transition-all duration-300 ${
                activeTab === tab
                  ? 'border-b-2 border-[#FE02A1] text-[#FE02A1]'
                  : 'hover:text-[#FE02A1]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Based on Active Tab */}
      <div className="container mx-auto px-4">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* KPI Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Community Members"
                value="15,234"
                change={12.5}
                timeframe="this month"
              />
              <KPICard
                title="Active Projects"
                value="342"
                change={8.3}
                timeframe="this week"
              />
              <KPICard
                title="Resources Shared"
                value="1,892"
                change={15.7}
                timeframe="this month"
              />
              <KPICard
                title="Engagement Rate"
                value="87%"
                change={5.2}
                timeframe="this week"
              />
            </div>

            {/* Chat Room */}
            <ChatRoom />

            {/* Shared Resources */}
            <SharedResourceManager />

            {/* Project Progress Chart */}
            <ProjectProgressChart />

            {/* Project Tracking */}
            <div className="grid md:grid-cols-2 gap-8">
              <ProjectTracking />
              <TaskBoard />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-12">
            <AnalyticsDashboard />
            <DeliverablesList />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-12">
            <ProjectProgressChart />
            <TaskBoard />
            <ProjectTracking />
            <DeliverablesList />
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-12">
            <SharedResourceManager />
            <ResourceLibrary />
            <SharedResources />
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;