import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ArrowRight, Rocket, Calendar, Target, BarChart, CheckCircle2, AlertCircle, Send, FileText, Globe, TrendingUp } from 'lucide-react';
import Sphere from '../../components/Sphere';
import ChatWindow from '../../components/ChatWindow';

const launchMethods = [
  {
    icon: Calendar,
    title: 'Launch Planning',
    description: 'Comprehensive timeline and milestone planning',
    features: [
      'Launch roadmap development',
      'Key milestone identification',
      'Resource allocation planning',
      'Risk assessment and mitigation'
    ]
  },
  {
    icon: Target,
    title: 'Market Positioning',
    description: 'Strategic positioning for optimal market penetration',
    features: [
      'Competitive analysis',
      'Value proposition refinement',
      'Target audience definition',
      'Positioning strategy'
    ]
  },
  {
    icon: BarChart,
    title: 'Marketing Strategy',
    description: 'Multi-channel marketing approach for maximum visibility',
    features: [
      'Channel strategy development',
      'Content planning',
      'Promotional campaigns',
      'PR and media relations'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Analytics & Optimization',
    description: 'Data-driven performance monitoring and optimization',
    features: [
      'KPI definition and tracking',
      'Real-time analytics dashboard',
      'Performance optimization',
      'Growth strategy refinement'
    ]
  }
];

const benefits = [
  {
    icon: Rocket,
    title: 'Accelerated Growth',
    description: 'Strategic launch to maximize initial traction and growth'
  },
  {
    icon: Globe,
    title: 'Market Penetration',
    description: 'Targeted approach to capture market share effectively'
  },
  {
    icon: FileText,
    title: 'Clear Roadmap',
    description: 'Detailed plan with measurable milestones and objectives'
  }
];

const faqs = [
  {
    question: 'How far in advance should we plan our product launch?',
    answer: 'We recommend starting the launch planning process at least 3-6 months before your target launch date. This provides adequate time for strategy development, content creation, team preparation, and pre-launch activities.'
  },
  {
    question: 'What metrics should we track during and after launch?',
    answer: 'Key metrics typically include user acquisition, activation rates, retention, revenue (if applicable), engagement metrics, and marketing performance indicators. We\'ll help you identify the most relevant KPIs for your specific product and business goals.'
  },
  {
    question: 'How do you handle launch delays or pivots?',
    answer: 'Our launch strategy is designed with flexibility in mind. We build contingency plans, establish clear go/no-go criteria, and maintain agile processes that can adapt to changing timelines or strategic pivots.'
  },
  {
    question: 'What makes a successful product launch?',
    answer: 'A successful launch combines thorough preparation, clear positioning, effective communication, and proper expectation setting. Success is measured not just by initial metrics but by establishing a foundation for sustainable growth and market presence.'
  }
];

const LaunchStrategy = () => {
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
              Launch Strategy
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Comprehensive go-to-market strategies to ensure successful product launches
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
              Chat with Launch Strategy Expert
            </h2>
            <ChatWindow pageContext="launch-strategy" />
            <div className="mt-4 text-white/60 text-sm">
              <p>Ask questions about our launch strategy process, methodologies, or how to get started with your project.</p>
            </div>
          </div>
        </section>
      )}

      {/* Methods Section */}
      <section id="methods" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Launch Strategy Methods
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {launchMethods.map((method) => {
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
            Launch Strategy Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-start gap-8 pb-12">
              <div className="flex-none">
                <div className="w-12 h-12 rounded-full bg-[rgba(254,2,161,0.1)] border border-[#FE02A1] flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-white mb-2">Pre-Launch Assessment</h3>
                <p className="text-white/80">Comprehensive market analysis, competitive landscape evaluation, and target audience definition.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Strategy Development</h3>
                <p className="text-white/80">Creation of comprehensive launch plan, marketing strategy, and positioning framework.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Launch Execution</h3>
                <p className="text-white/80">Coordinated implementation of marketing campaigns, PR activities, and launch events.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Post-Launch Optimization</h3>
                <p className="text-white/80">Performance monitoring, data analysis, and strategy refinement based on market response.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Benefits of Strategic Launch
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
              Ready to Launch Your Product?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let our experts help you create a successful launch strategy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Create Launch Plan
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

export default LaunchStrategy;