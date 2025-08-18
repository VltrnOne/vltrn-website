import React from 'react';
import { CheckCircle2, Clock, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Automated Onboarding',
    description: 'Streamlined process with step-by-step guidance and instant setup',
  },
  {
    icon: Users,
    title: 'Collaboration Tools',
    description: 'Real-time communication and project management capabilities',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Enterprise-grade security for your sensitive business data',
  },
  {
    icon: CheckCircle2,
    title: 'Progress Tracking',
    description: 'Monitor milestones and track project success in real-time',
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-4 [text-shadow:0_0_15px_#FE02A1]">
          Platform Features
        </h2>
        <p className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to manage and grow your business effectively
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(254,2,161,0.1)] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-[#FE02A1]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">{feature.title}</h3>
                <p className="text-white/80 text-center">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;