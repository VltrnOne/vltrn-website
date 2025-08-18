import React from 'react';
import { Calendar } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-12 text-center">
        <h2 className="text-4xl font-['Exo_2'] font-bold text-white mb-4 [text-shadow:0_0_15px_#FE02A1]">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Schedule a consultation with our experts and discover how VLTRN can help you achieve your business goals
        </p>
        <a
          href="https://zcal.co/t/vltrnjay/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
        >
          <Calendar className="w-5 h-5" />
          Schedule Meeting
        </a>
      </div>
    </section>
  );
};

export default CallToAction;