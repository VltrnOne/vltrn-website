import React from 'react';

const About = () => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          About <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">VLTRN</span>
        </h1>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            VLTRN is a cutting-edge technology company dedicated to transforming businesses through innovative AI solutions, 
            modern web development, and strategic consulting services.
          </p>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            Founded with a vision to democratize advanced technology, we help businesses of all sizes leverage the power 
            of artificial intelligence and modern software solutions to accelerate growth and achieve competitive advantages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300">
              To empower businesses with cutting-edge technology solutions that drive innovation, efficiency, and growth.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300">
              A world where every business can access and leverage advanced AI and technology solutions to succeed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;