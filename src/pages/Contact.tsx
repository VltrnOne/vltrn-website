import React from 'react';

const Contact = () => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Contact <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Us</span>
        </h1>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <p className="text-xl text-gray-300 text-center mb-8">
            Ready to transform your business? Get in touch with our team.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Get Started</h3>
              <p className="text-gray-300 mb-4">Contact us to discuss your project needs.</p>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
                Contact Now
              </button>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Information</h3>
              <p className="text-gray-300">Email: info@vltrn.agency</p>
              <p className="text-gray-300">Phone: Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
