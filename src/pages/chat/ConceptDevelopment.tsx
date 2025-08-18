import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ArrowRight, Lightbulb, Zap, Target, Compass, CheckCircle2, AlertCircle, FileText, Sparkles, MessageSquare } from 'lucide-react';
import Sphere from '../../components/Sphere';
import ChatWindow from '../../components/ChatWindow';

const conceptMethods = [
  {
    icon: Lightbulb,
    title: 'Ideation Workshops',
    description: 'Collaborative sessions to generate innovative product concepts',
    features: [
      'Cross-functional team collaboration',
      'Design thinking principles',
      'Structured brainstorming frameworks',
      'Concept prioritization tools'
    ]
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping',
    description: 'Quick visualization of concepts for early feedback',
    features: [
      'Low-fidelity wireframing',
      'Interactive concept models',
      'User feedback collection',
      'Concept iteration process'
    ]
  },
  {
    icon: Target,
    title: 'Market Validation',
    description: 'Research-driven concept validation with target audiences',
    features: [
      'Target audience analysis',
      'Competitive landscape review',
      'Value proposition testing',
      'Market opportunity sizing'
    ]
  },
  {
    icon: Compass,
    title: 'Strategic Alignment',
    description: 'Ensure concepts align with business vision and goals',
    features: [
      'Strategic fit assessment',
      'Resource requirement planning',
      'Roadmap integration',
      'Stakeholder alignment sessions'
    ]
  }
];

const benefits = [
  {
    icon: FileText,
    title: 'Documented Vision',
    description: 'Clear documentation of the product concept and vision'
  },
  {
    icon: Sparkles,
    title: 'Innovation Focus',
    description: 'Structured approach to fostering creativity and innovation'
  },
  {
    icon: Target,
    title: 'Reduced Risk',
    description: 'Early validation to minimize development risks'
  }
];

const faqs = [
  {
    question: 'How long does the concept development phase typically take?',
    answer: 'The concept development timeline varies based on project complexity and scope. Typically, it ranges from 2-6 weeks for most products, with additional time for more complex or innovative solutions.'
  },
  {
    question: 'What deliverables can I expect from the concept phase?',
    answer: 'Deliverables include a comprehensive concept brief, initial visual mockups, market validation report, technical feasibility assessment, and a strategic roadmap for the next development phases.'
  },
  {
    question: 'How do you ensure concepts are technically feasible?',
    answer: 'We integrate technical experts into the ideation process and conduct feasibility assessments to evaluate technical constraints, required resources, and potential implementation challenges.'
  },
  {
    question: 'What if we already have a concept but need refinement?',
    answer: 'We offer concept refinement services where we evaluate existing concepts, identify improvement opportunities, and enhance the value proposition based on market insights and user feedback.'
  }
];

const ConceptDevelopment = () => {
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
              Concept Development
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Transform your ideas into well-defined, validated product concepts ready for development
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
              Chat with Concept Development Expert
            </h2>
            <ChatWindow pageContext="concept-development" />
            <div className="mt-4 text-white/60 text-sm">
              <p>Ask questions about our concept development process, methodologies, or how to get started with your project.</p>
            </div>
          </div>
        </section>
      )}

      {/* Methods Section */}
      <section id="methods" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Concept Development Methods
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {conceptMethods.map((method) => {
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
            Concept Development Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-start gap-8 pb-12">
              <div className="flex-none">
                <div className="w-12 h-12 rounded-full bg-[rgba(254,2,161,0.1)] border border-[#FE02A1] flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-white mb-2">Discovery Session</h3>
                <p className="text-white/80">Deep dive into your vision, goals, and constraints to establish a solid foundation for concept development.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Ideation & Exploration</h3>
                <p className="text-white/80">Collaborative workshops to generate innovative concepts, explore possibilities, and push creative boundaries.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Concept Refinement</h3>
                <p className="text-white/80">Evaluate and refine concepts based on feasibility, desirability, and viability to select the most promising direction.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Validation & Documentation</h3>
                <p className="text-white/80">Validate the concept with stakeholders and target users, then create comprehensive documentation to guide future development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Why Invest in Concept Development?
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
              Ready to Develop Your Concept?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let's transform your vision into a clearly defined concept that's ready for development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Schedule Concept Workshop
                <MessageSquare className="w-5 h-5" />
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

export default ConceptDevelopment;