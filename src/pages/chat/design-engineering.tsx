import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ArrowRight, Code, Wrench, Zap, CheckCircle2, AlertCircle, Send, FileText, Database, Layout } from 'lucide-react';
import Sphere from '../../components/Sphere';
import ChatWindow from '../../components/ChatWindow';

const designMethods = [
  {
    icon: Layout,
    title: 'User Experience Design',
    description: 'Create intuitive and engaging user experiences',
    features: [
      'User research and personas',
      'Information architecture',
      'Wireframing and prototyping',
      'Usability testing'
    ]
  },
  {
    icon: Code,
    title: 'Frontend Development',
    description: 'Build responsive and interactive user interfaces',
    features: [
      'Modern framework implementation',
      'Responsive design',
      'Cross-browser compatibility',
      'Performance optimization'
    ]
  },
  {
    icon: Database,
    title: 'Backend Development',
    description: 'Develop robust and scalable server-side solutions',
    features: [
      'API development',
      'Database design',
      'Authentication and security',
      'Cloud infrastructure'
    ]
  },
  {
    icon: Wrench,
    title: 'Quality Assurance',
    description: 'Ensure product reliability and performance',
    features: [
      'Automated testing',
      'Manual testing',
      'Performance testing',
      'Security audits'
    ]
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Technical Excellence',
    description: 'Industry-leading engineering practices and standards'
  },
  {
    icon: CheckCircle2,
    title: 'Quality Assurance',
    description: 'Rigorous testing and quality control processes'
  },
  {
    icon: FileText,
    title: 'Comprehensive Documentation',
    description: 'Detailed technical documentation for future maintenance'
  }
];

const faqs = [
  {
    question: 'What technologies do you specialize in?',
    answer: 'We have expertise in a wide range of technologies including React, Angular, Vue, Node.js, Python, Java, AWS, Azure, and more. Our technology stack is chosen based on your specific project requirements and business goals.'
  },
  {
    question: 'How do you ensure quality in your development process?',
    answer: 'We implement a comprehensive quality assurance process that includes automated testing, manual testing, code reviews, and continuous integration/continuous deployment (CI/CD) pipelines to ensure high-quality deliverables.'
  },
  {
    question: 'Can you work with our existing development team?',
    answer: 'Absolutely. We can integrate with your existing team, providing specialized expertise or additional capacity as needed. We adapt to your preferred collaboration tools and methodologies.'
  },
  {
    question: 'What is your approach to security?',
    answer: 'Security is built into our development process from the ground up. We follow OWASP guidelines, conduct regular security audits, implement secure coding practices, and provide recommendations for ongoing security maintenance.'
  }
];

const DesignEngineering = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
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
              End-to-end product design and engineering services to bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('methods')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Explore Methods
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

      {/* Methods Section */}
      <section id="methods" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Design & Engineering Methods
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {designMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-white/80 mb-4">{method.description}</p>
                  <ul className="space-y-2">
                    {method.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-[#FE02A1] flex-shrink-0 mt-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedMethod(method.title)}
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

      {/* Process Flow Section */}
      <section className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Engineering Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-start gap-8 pb-12">
              <div className="flex-none">
                <div className="w-12 h-12 rounded-full bg-[rgba(254,2,161,0.1)] border border-[#FE02A1] flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-white mb-2">Requirements Analysis</h3>
                <p className="text-white/80">Thorough analysis of project requirements, constraints, and technical specifications.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Architecture & Design</h3>
                <p className="text-white/80">Creating a robust technical architecture and detailed design specifications.</p>
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
                <p className="text-white/80">Agile development with continuous integration and comprehensive testing.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Deployment & Maintenance</h3>
                <p className="text-white/80">Smooth deployment process with ongoing support and maintenance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Benefits of Our Engineering Approach
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
              Let's transform your vision into reality with expert design and engineering
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