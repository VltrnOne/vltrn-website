import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ArrowRight, Lightbulb, Code, Rocket, Target, CheckCircle2, AlertCircle, Zap, Wrench, Send } from 'lucide-react';
import Sphere from '../components/Sphere';
import { Link, useNavigate } from 'react-router-dom';

const services = [
  {
    icon: Lightbulb,
    title: 'Concept Development',
    description: 'Transform your ideas into viable product concepts',
    features: [
      'Ideation workshops',
      'Market research',
      'Value proposition development'
    ],
    chatPath: '/chat/concept-development'
  },
  {
    icon: Code,
    title: 'Prototyping',
    description: 'Rapid prototyping for idea validation',
    features: [
      'Rapid prototyping',
      '3D models and mockups',
      'Stakeholder feedback loops'
    ],
    chatPath: '/chat/prototyping'
  },
  {
    icon: Wrench,
    title: 'Product Design & Engineering',
    description: 'End-to-end product design and engineering',
    features: [
      'Technical architecture',
      'Full-stack development',
      'Quality assurance'
    ],
    chatPath: '/chat/design-engineering'
  },
  {
    icon: Rocket,
    title: 'Launch Strategy',
    description: 'Comprehensive go-to-market strategy',
    features: [
      'Launch planning',
      'Marketing strategy',
      'Performance monitoring'
    ],
    chatPath: '/chat/launch-strategy'
  }
];

const benefits = [
  {
    icon: Target,
    title: 'End-to-End Solutions',
    description: 'Comprehensive development from concept to launch'
  },
  {
    icon: Zap,
    title: 'Cutting-Edge Tech',
    description: 'Access to latest technologies and methodologies'
  },
  {
    icon: CheckCircle2,
    title: 'Quality Assured',
    description: 'Rigorous testing and quality control processes'
  }
];

const faqs = [
  {
    question: 'What industries do you specialize in?',
    answer: 'We have expertise across multiple industries including technology, healthcare, finance, and manufacturing.'
  },
  {
    question: 'How long does the product development process take?',
    answer: 'Timeline varies based on product complexity and requirements. Typical projects range from 3-12 months.'
  },
  {
    question: 'What technologies do you use in development?',
    answer: 'We utilize cutting-edge technologies including AI/ML, cloud computing, IoT, and modern development frameworks.'
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes, we offer comprehensive post-launch support including maintenance, updates, and optimization.'
  }
];

const ProductDevelopment = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleServiceClick = (chatPath: string) => {
    navigate(chatPath);
  };

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
              Transform Your Ideas Into Market-Ready Solutions
            </h1>
            <p className="text-xl text-white/80 mb-8">
              From concept to reality, we help businesses innovate, build, and scale.
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
            Our Development Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
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
                    onClick={() => handleServiceClick(service.chatPath)}
                    className="mt-6 w-full px-6 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white hover:bg-[#FE02A1] hover:border-transparent transition-all duration-300"
                  >
                    {service.title === 'Concept Development' ? 'Create Concept' : 
                     service.title === 'Prototyping' ? 'Create Prototype' : 
                     service.title === 'Product Design & Engineering' ? 'Create Design' : 
                     'Create Launch Plan'}
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
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/80">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
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
              Ready to Build Your Product?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let's transform your vision into reality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Start Your Project
                <Send className="w-5 h-5" />
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

export default ProductDevelopment;