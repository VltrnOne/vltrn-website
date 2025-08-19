import React, { useState } from 'react';
import { MessageSquare, Users, Trophy, Bell, Search, Send, Plus, Heart, MessageCircle, Flag, Building2, TrendingUp } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('overview');

  console.log('🚀 Community page is rendering...');

  return (
    <div className="min-h-screen pt-24 bg-gradient-radial from-[#0A0A0A] to-black">
      {/* Page Header */}
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Community</h1>
        <p className="text-white/80 text-lg">Connect, collaborate, and grow with the VLTRN community</p>
      </div>

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
              <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
                <h3 className="text-[#FE02A1] text-sm font-semibold mb-2">Community Members</h3>
                <p className="text-3xl font-bold text-white">15,234</p>
                <p className="text-green-400 text-sm">+12.5% this month</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
                <h3 className="text-[#FE02A1] text-sm font-semibold mb-2">Active Projects</h3>
                <p className="text-3xl font-bold text-white">342</p>
                <p className="text-green-400 text-sm">+8.3% this week</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
                <h3 className="text-[#FE02A1] text-sm font-semibold mb-2">Resources Shared</h3>
                <p className="text-3xl font-bold text-white">1,892</p>
                <p className="text-green-400 text-sm">+15.7% this month</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
                <h3 className="text-[#FE02A1] text-sm font-semibold mb-2">Engagement Rate</h3>
                <p className="text-3xl font-bold text-white">87%</p>
                <p className="text-green-400 text-sm">+5.2% this week</p>
              </div>
            </div>

            {/* Community Features */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
                <h3 className="text-[#FE02A1] text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-white">
                    <Users size={20} className="text-[#FE02A1]" />
                    <span>New member joined: Sarah Chen</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white">
                    <Trophy size={20} className="text-[#FE02A1]" />
                    <span>Project "EcoTech" completed successfully</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white">
                    <MessageSquare size={20} className="text-[#FE02A1]" />
                    <span>New discussion: "AI in Healthcare"</span>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
                <h3 className="text-[#FE02A1] text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-[#FE02A1] hover:bg-[#FE02A1]/80 text-white px-4 py-2 rounded-lg transition-colors">
                    Start New Discussion
                  </button>
                  <button className="w-full bg-transparent border border-[#FE02A1] text-[#FE02A1] hover:bg-[#FE02A1] hover:text-white px-4 py-2 rounded-lg transition-colors">
                    Share Resource
                  </button>
                  <button className="w-full bg-transparent border border-[#FE02A1] text-[#FE02A1] hover:bg-[#FE02A1] hover:text-white px-4 py-2 rounded-lg transition-colors">
                    Join Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
              <h3 className="text-[#FE02A1] text-2xl font-semibold mb-4">Community Analytics</h3>
              <p className="text-white/80">Analytics dashboard coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
              <h3 className="text-[#FE02A1] text-2xl font-semibold mb-4">Community Projects</h3>
              <p className="text-white/80">Project management coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
              <h3 className="text-[#FE02A1] text-2xl font-semibold mb-4">Shared Resources</h3>
              <p className="text-white/80">Resource library coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;