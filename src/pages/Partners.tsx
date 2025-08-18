import React from 'react';
import { ArrowRight, Award, Calendar, Download, Globe2, LineChart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sphere from '../components/Sphere';

const partnerTiers = [
  {
    name: 'Gold Partner',
    icon: Award,
    benefits: [
      'Priority Support 24/7',
      'Custom Integration Solutions',
      'Dedicated Account Manager',
      'Joint Marketing Initiatives',
      'Advanced Analytics Dashboard',
    ],
    color: '#FFD700',
  },
  {
    name: 'Silver Partner',
    icon: Award,
    benefits: [
      'Premium Support',
      'API Access',
      'Partner Portal Access',
      'Co-marketing Opportunities',
      'Performance Tracking',
    ],
    color: '#C0C0C0',
  },
  {
    name: 'Bronze Partner',
    icon: Award,
    benefits: [
      'Standard Support',
      'Basic Integration Tools',
      'Resource Library Access',
      'Partner Directory Listing',
      'Monthly Reports',
    ],
    color: '#CD7F32',
  },
];

const resources = [
  {
    title: 'Marketing Kit',
    icon: Download,
    description: 'Access brand assets and marketing materials',
  },
  {
    title: 'Integration Guide',
    icon: Globe2,
    description: 'Technical documentation and API references',
  },
  {
    title: 'Analytics Dashboard',
    icon: LineChart,
    description: 'Track performance and ROI metrics',
  },
  {
    title: 'Partner Community',
    icon: Users,
    description: 'Connect with other partners and share insights',
  },
];

const upcomingEvents = [
  {
    title: 'Partner Summit 2024',
    date: 'March 15, 2024',
    type: 'Virtual Conference',
    description: 'Annual gathering of VLTRN partners worldwide',
  },
  {
    title: 'Integration Workshop',
    date: 'April 2, 2024',
    type: 'Technical Training',
    description: 'Learn about new API features and integration best practices',
  },
  {
    title: 'Marketing Masterclass',
    date: 'April 20, 2024',
    type: 'Webinar',
    description: 'Strategies for successful co-marketing campaigns',
  },
];

const Partners = () => {
  return (
    <div className="min-h-screen bg-gradient-radial from-[#0A0A0A] to-black pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 animate-nebula opacity-20" />
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Exo_2'] font-bold text-white mb-6 [text-shadow:0_0_15px_#FE02A1]">
              Empowering Partnerships for Success
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Access tools, resources, and insights to maximize your impact in the digital ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Join Now
              </button>
              <button className="px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="h-[400px] relative z-10">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Sphere />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-4 [text-shadow:0_0_15px_#FE02A1]">
            Partner Tiers
          </h2>
          <p className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto">
            Choose the partnership level that best fits your business goals
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {partnerTiers.map((tier) => (
              <div
                key={tier.name}
                className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: `0 0 20px ${tier.color}20`,
                }}
              >
                <tier.icon
                  className="w-12 h-12 mb-4"
                  style={{ color: tier.color }}
                />
                <h3 className="text-2xl font-bold text-white mb-4">{tier.name}</h3>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="text-white/80 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FE02A1]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 px-6 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg text-white hover:bg-[#FE02A1] hover:border-transparent transition-all duration-300">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Hub */}
      <section className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-4 [text-shadow:0_0_15px_#FE02A1]">
            Partner Resources
          </h2>
          <p className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to succeed in your partnership journey
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:scale-105 transition-all duration-300"
              >
                <resource.icon className="w-12 h-12 text-[#FE02A1] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                <p className="text-white/80 mb-4">{resource.description}</p>
                <button className="flex items-center gap-2 text-[#FE02A1] hover:gap-4 transition-all duration-300">
                  Access Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-4 [text-shadow:0_0_15px_#FE02A1]">
            Upcoming Events
          </h2>
          <p className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto">
            Join us for exclusive partner events and training sessions
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:scale-105 transition-all duration-300"
              >
                <Calendar className="w-12 h-12 text-[#FE02A1] mb-4" />
                <div className="text-sm text-[#FE02A1] mb-2">{event.date}</div>
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <div className="text-sm text-white/60 mb-2">{event.type}</div>
                <p className="text-white/80 mb-4">{event.description}</p>
                <button className="w-full px-6 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg text-white hover:bg-[#FE02A1] hover:border-transparent transition-all duration-300">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-12 text-center">
            <h2 className="text-4xl font-['Exo_2'] font-bold text-white mb-4 [text-shadow:0_0_15px_#FE02A1]">
              Ready to Join Our Partner Network?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Take the first step towards a successful partnership with VLTRN
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;