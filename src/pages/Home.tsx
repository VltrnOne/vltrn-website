import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section - Full Screen */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-8xl font-bold mb-6 tracking-tight">
          VLTRN
        </h1>
        <h2 className="text-3xl text-gray-400 mb-12 font-light tracking-wide">
          CREATIVE AGENCY
        </h2>
        
        {/* Description */}
        <p className="text-xl text-gray-300 max-w-2xl mb-16 leading-relaxed">
          We craft digital experiences that inspire, engage, and transform. 
          From concept to execution, we bring your vision to life.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to="/client-intakes"
            className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg font-medium"
          >
            Start Project
          </Link>
          <Link
            to="/services"
            className="px-8 py-4 border-2 border-gray-400 text-gray-400 hover:border-white hover:text-white transition-all duration-300 text-lg font-medium"
          >
            View Services
          </Link>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full mx-auto">
          <div className="w-1 h-3 bg-gray-500 rounded-full mx-auto mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;