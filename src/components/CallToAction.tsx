import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-500/10 to-purple-600/10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Business</span>?
        </h2>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Join hundreds of businesses that have already accelerated their growth with VLTRN's innovative solutions and expert guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            to="/contact"
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25"
          >
            🚀 Start Your Journey
          </Link>
          
          <Link
            to="/about"
            className="px-8 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-lg hover:bg-white/10 hover:border-white/50 transform hover:scale-105 transition-all duration-200"
          >
            📚 Learn More
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">500+</div>
            <div className="text-gray-300">Happy Clients</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">1000+</div>
            <div className="text-gray-300">Projects Completed</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">99.9%</div>
            <div className="text-gray-300">Uptime Guarantee</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">24/7</div>
            <div className="text-gray-300">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;