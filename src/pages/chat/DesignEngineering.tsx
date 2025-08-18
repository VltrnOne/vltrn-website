import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ArrowRight, Code, Wrench, Database, Layers, CheckCircle2, FileCode, Zap, Send, MessageSquare } from 'lucide-react';
import Sphere from '../../components/Sphere';
import ChatWindow from '../../components/ChatWindow';

const designEngineeringServices = [
  {
    icon: Layers,
    title: 'User Interface Design',
    description: 'Creating intuitive and engaging user interfaces',
    features: [
      'User-centered design approach',
      'Interactive prototypes',
      'Visual design systems',
      'Accessibility compliance'
    ]
  },
  {
    icon: Code,
    title: 'Frontend Engineering',
    description: 'Building responsive and performant frontend applications',
    features: [
      'Modern frontend frameworks',
      'Responsive design',
      'Performance optimization',
      'Cross-browser compatibility'
    ]
  },
  {
    icon: Database,
    title: 'Backend Architecture',
    description: 'Developing robust and scalable backend systems',
    features: [
      'API development',
      'Database design',
      'Cloud infrastructure',
      'Security implementation'
    ]
  },
  {
    icon: FileCode,
    title: 'Quality Assurance',
    description: 'Ensuring software reliability and performance',
    features: [
      'Automated testing',
      'Manual testing',
      'Performance testing',
      'Security auditing'
    ]
  }
];

const benefits = [
  {
    icon: Wrench,
    title: 'Technical Excellence',
    description: 'Industry-leading engineering practices and architecture'
  },
  {
    icon: Zap,
    title: 'Scalable Solutions',
    description: 'Built to handle growth and changing requirements'
  },
  {
    icon: CheckCircle2,
    title: 'Comprehensive Testing',
    description: 'Rigorous quality assurance at every stage'
  }
];

const faqs = [
  {
    question: 'What technologies do you specialize in?',
    answer: 'We work with a wide range of technologies including React, Angular, Vue, Node.js, Python, Go, AWS, Google Cloud, and more. Our technology choices are always guided by your specific project requirements and business goals.'
  },
  {
    question: 'How do you approach the design and engineering process?',
    answer: 'We follow a collaborative, iterative approach that begins with understanding user needs and business requirements. We create detailed technical specifications, build incrementally with regular feedback cycles, and maintain clear communication throughout the process.'
  },
  {
    question: 'Can you work with our existing development team?',
    answer: 'Yes, we frequently collaborate with in-house teams, providing specialized expertise or additional capacity. We can adapt to your existing workflows and tools to ensure seamless integration.'
  },
  {
    question: 'How do you ensure the quality of your deliverables?',
    answer: 'We implement comprehensive testing strategies including automated unit, integration, and end-to-end tests. We also conduct code reviews, performance testing, and security audits to ensure high-quality, robust deliverables.'
  }
];

const DesignEngineering = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);

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
              Product Design & Engineering
            </h1>
            <p className="text-xl text-white/80 mb-8">
              End-to-end product design and engineering solutions that bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Explore Services
              </button>
              <button
                onClick={() => setShowChat(true)}
                className="px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Chat with Expert
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

      {/* Chat Section (conditionally shown) */}
      {showChat && (
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-['Exo_2'] font-bold text-white mb-8 [text-shadow:0_0_15px_#FE02A1]">
              Chat with Design & Engineering Expert
            </h2>
            <ChatWindow pageContext="design-engineering" />
            <div className="mt-4 text-white/60 text-sm">
              <p>Ask questions about our design and engineering process, technologies, or how to get started with your project.</p>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Design & Engineering Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {designEngineeringServices.map((service) => {
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Development Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-start gap-8 pb-12">
              <div className="flex-none">
                <div className="w-12 h-12 rounded-full bg-[rgba(254,2,161,0.1)] border border-[#FE02A1] flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-white mb-2">Discovery & Planning</h3>
                <p className="text-white/80">Understanding requirements, defining scope, and creating a detailed project plan.</p>
              </div>
              <div className="absolute left-6 top-12 w-px h-full bg-[rgba(254,2,161,0.3)]" />
            </div>
            
            <div className="relative flex items-start gap-8 pb-12">
              <div className="flex-none">
                <div className="w-12 h-12 rounded-full bg-[rgba(254,2,161,0.1)] border border-[#FE02A1] flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-white mb-2">Design & Architecture</h3>
                <p className="text-white/80">Creating user interface designs and establishing technical architecture.</p>
              </div>
              <div className="absolute left-6 top-12 w-px h-full bg-[rgba(254,2,161,0.3)]" />
            </div>
            
            <div className="relative flex items-start gap-8 pb-12">
              <div className="flex-none">
                <div className="w-12 h-12 rounded-full bg-[rgba(254,2,161,0.1)] border border-[#FE02A1] flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-white mb-2">Development & Testing</h3>
                <p className="text-white/80">Implementing solutions with continuous testing and quality assurance.</p>
              </div>
              <div className="absolute left-6 top-12 w-px h-full bg-[rgba(254,2,161,0.3)]" />
            </div>
            
            <div className="relative flex items-start gap-8">
              <div className="flex-none">
                <div className="w-12 h-12 rounded-full bg-[rgba(254,2,161,0.1)] border border-[#FE02A1] flex items-center justify-center text-white font-bold">
                  4
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-white mb-2">Deployment & Support</h3>
                <p className="text-white/80">Launching the product and providing ongoing maintenance and support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Benefits of Our Approach
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
              Ready to Build Your Product?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let our experts help you design and develop your next product
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Start Your Project
                <Send className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowChat(true)}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Chat with Expert
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignEngineering;