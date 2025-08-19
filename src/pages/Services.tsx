import React from 'react';

const Services = () => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Our <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Services</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">AI Development</h3>
            <p className="text-gray-300">Custom AI solutions for your business needs</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
            <p className="text-gray-300">Modern, responsive web applications</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Consulting</h3>
            <p className="text-gray-300">Strategic business guidance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
