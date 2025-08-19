import React from 'react';

const Resources = () => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Resources</span>
        </h1>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <p className="text-xl text-gray-300 text-center">
            Access shared resources and tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
