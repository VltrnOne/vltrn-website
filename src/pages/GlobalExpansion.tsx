import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ArrowRight, Globe2, Shield, FileText, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import Sphere from '../components/Sphere';

const services = [
  {
    name: 'Market Entry Strategy',
    description: 'Comprehensive market research and analysis to identify opportunities and minimize risks',
    features: [
      'Market research and analysis',
      'Target audience identification',
      'Competitive landscape evaluation',
      'Risk assessment and mitigation',
      'Entry strategy development'
    ],
    icon: Globe2
  },
  {
    name: 'Regulatory Compliance',
    description: 'Navigate complex regulatory environments with confidence',
    features: [
      'Legal compliance assessment',
      'Tax structure optimization',
      'Documentation support',
      'Regulatory monitoring',
      'Local legal expert network'
    ],
    icon: Shield
  },
  {
    name: 'Localization Support',
    description: 'Adapt your brand and products for local market success',
    features: [
      'Content localization',
      'Cultural adaptation',
      'Product modification',
      'Local market testing',
      'Brand positioning'
    ],
    icon: FileText
  },
  {
    name: 'Supply Chain Management',
    description: 'Optimize your global supply chain for efficiency and reliability',
    features: [
      'Vendor assessment',
      'Distribution network setup',
      'Logistics optimization',
      'Inventory management',
      'Quality control systems'
    ],
    icon: Users
  }
];

const benefits = [
  {
    title: 'Market Expertise',
    description: 'Access to deep local market insights and trends'
  },
  {
    title: 'Risk Mitigation',
    description: 'Comprehensive risk assessment and management'
  },
  {
    title: 'Speed to Market',
    description: 'Accelerated market entry and growth'
  },
  {
    title: 'Local Networks',
    description: 'Access to established local partnerships'
  }
];

const steps = [
  {
    title: 'Initial Consultation',
    description: 'We assess your expansion goals and requirements'
  },
  {
    title: 'Market Analysis',
    description: 'Comprehensive research of target markets'
  },
  {
    title: 'Strategy Development',
    description: 'Customized expansion strategy creation'
  },
  {
    title: 'Implementation',
    description: 'Guided execution of your expansion plan'
  }
];

const faqs = [
  {
    question: 'Which markets do you specialize in?',
    answer: 'We have expertise across major global markets including North America, Europe, Asia-Pacific, and emerging markets. Our network of local partners ensures deep market knowledge wherever you want to expand.'
  },
  {
    question: 'How long does the expansion process typically take?',
    answer: 'The timeline varies based on market complexity and your specific needs. Typically, from initial assessment to market entry takes 3-6 months, with ongoing support available throughout your expansion journey.'
  },
  {
    question: 'What industries do you focus on?',
    answer: 'We support businesses across various sectors including technology, manufacturing, retail, and services. Our expertise is particularly strong in regulated industries and B2B services.'
  },
  {
    question: "What's included in the consultation?",
    answer: 'Our initial consultation includes a comprehensive assessment of your expansion readiness, target market analysis, and preliminary strategy recommendations. We also provide a detailed timeline and resource requirements.'
  }
];

const GlobalExpansion = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,2,161,0.1)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(254,2,161,0.05)_0%,transparent_100%)]" />
        
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Exo_2'] font-bold text-white mb-6 [text-shadow:0_0_15px_#FE02A1]">
              Global Expansion Solutions
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Expand your reach into new markets with confidence and ease
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Explore Services
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="h-[400px] relative">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Sphere />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Global Expansion Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.name}
                  className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-white/80 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-[#FE02A1] flex-shrink-0 mt-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedService(service.name)}
                    className="mt-6 w-full px-6 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white hover:bg-[#FE02A1] hover:border-transparent transition-all duration-300"
                  >
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Why Choose VLTRN
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Expansion Process
          </h2>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex items-start gap-8 pb-12 last:pb-0"
              >
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[rgba(254,2,161,0.1)] border border-[#FE02A1] flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/80">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-full bg-[rgba(254,2,161,0.3)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-white hover:text-[#FE02A1] transition-colors duration-300"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-white/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-12 text-center">
            <h2 className="text-4xl font-['Exo_2'] font-bold text-white mb-4 [text-shadow:0_0_15px_#FE02A1]">
              Ready to Expand Globally?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Take the first step towards international success with VLTRN
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Start Your Expansion
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalExpansion;