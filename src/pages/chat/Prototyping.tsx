import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ArrowRight, Lightbulb, Code, Rocket, Target, CheckCircle2, AlertCircle, Zap, Wrench, Send, Layers, Eye, Gauge, Users } from 'lucide-react';
import Sphere from '../../components/Sphere';
import ChatWindow from '../../components/ChatWindow';

const prototypeTypes = [
  {
    icon: Layers,
    title: 'Low-Fidelity Wireframes',
    description: 'Quick sketches and basic layouts to explore structure and functionality',
    features: [
      'Rapid iterations',
      'Focus on functionality and flow',
      'Minimal resource investment',
      'Early stakeholder feedback'
    ]
  },
  {
    icon: Eye,
    title: 'Visual Prototypes',
    description: 'Design-focused models showcasing the visual identity and user interface',
    features: [
      'Brand identity exploration',
      'Color scheme and typography',
      'UI component design',
      'Visual consistency validation'
    ]
  },
  {
    icon: Code,
    title: 'Interactive Prototypes',
    description: 'Clickable mockups that simulate key user interactions and flows',
    features: [
      'User flow validation',
      'Interactive elements',
      'Behavior simulation',
      'User testing platform'
    ]
  },
  {
    icon: Gauge,
    title: 'Functional Prototypes',
    description: 'Working models with partial functionality to validate technical aspects',
    features: [
      'Technical feasibility testing',
      'Integration validation',
      'Performance evaluation',
      'Technical risk assessment'
    ]
  }
];

const benefits = [
  {
    icon: Target,
    title: 'Risk Reduction',
    description: 'Identify and address potential issues early in the development process'
  },
  {
    icon: Zap,
    title: 'Accelerated Development',
    description: 'Streamline the development process with validated prototypes'
  },
  {
    icon: Users,
    title: 'User-Centered Design',
    description: 'Incorporate user feedback throughout the design and development process'
  }
];

const faqs = [
  {
    question: 'How do you select the right type of prototype for my project?',
    answer: 'We assess your specific goals, timeline, and resources to determine the most effective prototyping approach. For early concept validation, we might start with low-fidelity wireframes, while complex technical validation might require functional prototypes. Often, we use a progression of different prototypes throughout the development lifecycle.'
  },
  {
    question: 'Can prototypes be used for user testing?',
    answer: 'Absolutely. Prototypes are excellent tools for user testing and gathering feedback. We design prototypes specifically for user testing scenarios, focusing on the aspects that need validation while eliminating distractions. Our team can facilitate user testing sessions and help analyze the results.'
  },
  {
    question: 'How long does the prototyping phase typically take?',
    answer: 'The timeline varies depending on the complexity of the project and the type of prototype needed. Simple wireframes can be created in days, while fully functional prototypes might take several weeks. We work with you to establish a timeline that balances speed with the level of fidelity required.'
  },
  {
    question: 'What happens with the prototype after testing?',
    answer: 'After testing and validation, prototypes inform the final product development. High-fidelity prototypes often serve as specifications for development teams, while the insights gained drive product requirements and design decisions. In some cases, aspects of the prototype can be directly incorporated into the final product.'
  }
];

const Prototyping = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPrototype, setSelectedPrototype] = useState<string | null>(null);
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
              Rapid Prototyping
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Visualize your ideas and validate concepts quickly with our comprehensive prototyping solutions
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
              Chat with Prototyping Expert
            </h2>
            <ChatWindow pageContext="prototyping" />
            <div className="mt-4 text-white/60 text-sm">
              <p>Ask questions about prototyping methods, timelines, or how to get started with your project.</p>
            </div>
          </div>
        </section>
      )}

      {/* Prototype Types Section */}
      <section id="methods" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Prototype Types & Methodologies
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {prototypeTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-white/80 mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-[#FE02A1] flex-shrink-0 mt-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedPrototype(type.title)}
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
            Our Prototyping Process
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
                <p className="text-white/80">Define prototype goals, target audience, and key functionality to ensure alignment with project objectives.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Design & Creation</h3>
                <p className="text-white/80">Develop the prototype using appropriate tools and methodologies, focusing on the defined requirements and user experience.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Testing & Feedback</h3>
                <p className="text-white/80">Conduct user testing sessions and gather stakeholder feedback to identify strengths and improvement opportunities.</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Refinement & Iteration</h3>
                <p className="text-white/80">Implement feedback and iterate on the prototype until it meets quality standards and addresses all key requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Benefits of Prototyping
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
              Ready to Start Prototyping?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let our experts help you visualize your concept and validate your ideas quickly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Request a Prototype
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

export default Prototyping;