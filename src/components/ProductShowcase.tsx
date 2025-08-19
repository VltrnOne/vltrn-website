import React from 'react';

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how VLTRN transforms businesses with cutting-edge technology and AI-powered solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI Solutions */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-white mb-4">AI Solutions</h3>
            <p className="text-gray-300 mb-6">
              Leverage the power of artificial intelligence to automate processes, gain insights, and drive innovation.
            </p>
            <ul className="text-gray-400 space-y-2 mb-6">
              <li>• Machine Learning Models</li>
              <li>• Natural Language Processing</li>
              <li>• Predictive Analytics</li>
              <li>• Computer Vision</li>
            </ul>
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200">
              Learn More
            </button>
          </div>

          {/* Web Development */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
            <p className="text-gray-300 mb-6">
              Modern, responsive web applications built with the latest technologies and best practices.
            </p>
            <ul className="text-gray-400 space-y-2 mb-6">
              <li>• React & Next.js</li>
              <li>• TypeScript & Node.js</li>
              <li>• Cloud Infrastructure</li>
              <li>• Performance Optimization</li>
            </ul>
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200">
              Learn More
            </button>
          </div>

          {/* Business Consulting */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-white mb-4">Business Consulting</h3>
            <p className="text-gray-300 mb-6">
              Strategic guidance to help your business grow, scale, and adapt to changing market conditions.
            </p>
            <ul className="text-gray-400 space-y-2 mb-6">
              <li>• Digital Transformation</li>
              <li>• Process Optimization</li>
              <li>• Market Analysis</li>
              <li>• Growth Strategy</li>
            </ul>
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;