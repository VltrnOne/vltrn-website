import React from 'react';

const About = () => {
  console.log('🚀 About page is rendering...');

  return (
    <div className="min-h-screen pt-24 bg-gradient-radial from-[#0A0A0A] to-black">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">About VLTRN</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We are a forward-thinking agency dedicated to transforming businesses through innovative technology, 
            strategic partnerships, and cutting-edge solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#FE02A1] mb-4">Our Mission</h2>
            <p className="text-white/80">
              To empower businesses with the tools, knowledge, and connections they need to thrive in the digital age.
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#FE02A1] mb-4">Our Vision</h2>
            <p className="text-white/80">
              To be the leading platform for business transformation, innovation, and sustainable growth.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FE02A1] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
              <p className="text-white/80">Constantly pushing boundaries and exploring new possibilities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FE02A1] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">E</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Excellence</h3>
              <p className="text-white/80">Delivering the highest quality in everything we do</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FE02A1] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Trust</h3>
              <p className="text-white/80">Building lasting relationships through transparency and reliability</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button className="bg-[#FE02A1] hover:bg-[#FE02A1]/80 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;