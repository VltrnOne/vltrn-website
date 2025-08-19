import React from 'react';

const Dashboard = () => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Dashboard</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Projects</h3>
            <p className="text-4xl font-bold text-pink-500">12</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Tasks</h3>
            <p className="text-4xl font-bold text-purple-500">48</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Progress</h3>
            <p className="text-4xl font-bold text-green-500">85%</p>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Welcome to VLTRN Dashboard</h2>
          <p className="text-gray-300">Your project management and analytics hub.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;