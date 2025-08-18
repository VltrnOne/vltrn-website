import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { 
  ArrowRight, 
  BarChart2, 
  Brain, 
  Target, 
  LineChart,
  Zap,
  Shield,
  Settings,
  Send,
  CheckCircle2,
  Download,
  Users,
  TrendingUp
} from 'lucide-react';
import Sphere from '../components/Sphere';

const tools = [
  {
    icon: BarChart2,
    title: 'Real-Time Dashboards',
    description: 'Monitor key metrics in real-time with customizable widgets',
    features: [
      'Live data monitoring',
      'Customizable widgets',
      'Multi-device access'
    ]
  },
  {
    icon: Brain,
    title: 'Predictive Analytics',
    description: 'AI-powered forecasting for data-driven decisions',
    features: [
      'Trend forecasting',
      'Scenario planning',
      'Risk assessment'
    ]
  },
  {
    icon: Target,
    title: 'KPI Tracking',
    description: 'Track and visualize progress on critical KPIs',
    features: [
      'Custom KPI setup',
      'Automated reporting',
      'Goal tracking'
    ]
  },
  {
    icon: LineChart,
    title: 'Data Visualization',
    description: 'Interactive charts and graphs for complex data analysis',
    features: [
      'Interactive charts',
      'Custom visualizations',
      'Data segmentation'
    ]
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Real-Time Insights',
    description: 'Access live data and insights tailored to your business needs'
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms for predictive analytics and insights'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security protecting your sensitive data'
  },
  {
    icon: Settings,
    title: 'Custom Integration',
    description: 'Seamless integration with your existing tools and platforms'
  }
];

const useCases = [
  {
    icon: TrendingUp,
    title: 'Sales Performance',
    description: 'Track revenue streams and sales trends in real-time',
    metrics: ['30% increase in sales', '45% better forecasting']
  },
  {
    icon: Settings,
    title: 'Operational Efficiency',
    description: 'Identify bottlenecks and optimize workflows',
    metrics: ['25% cost reduction', '40% faster processes']
  },
  {
    icon: Users,
    title: 'Customer Insights',
    description: 'Analyze user behavior and engagement patterns',
    metrics: ['50% better retention', '35% more engagement']
  }
];

const faqs = [
  {
    question: 'What types of data sources can be integrated?',
    answer: 'We support integration with most major databases, APIs, and business tools including SQL databases, NoSQL databases, REST APIs, and popular business platforms.'
  },
  {
    question: 'How secure is my data?',
    answer: 'We implement bank-grade security measures including end-to-end encryption, regular security audits, and compliance with major data protection regulations.'
  },
  {
    question: 'Can dashboards be customized for different teams?',
    answer: 'Yes, each team can have customized dashboards with relevant KPIs and metrics, along with role-based access control.'
  },
  {
    question: 'Is training provided for using the tools?',
    answer: 'Yes, we provide comprehensive training, documentation, and ongoing support to ensure your team can effectively use all analytics tools.'
  }
];

const PerformanceAnalytics = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

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
              Data-Driven Insights for Smarter Decisions
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Unlock actionable insights to drive growth and optimize performance
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Explore Tools
              </button>
              <button
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
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

      {/* Tools Section */}
      <section id="tools" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Advanced Tools for Performance Analysis
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.title}
                  className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                  <p className="text-white/80 mb-4">{tool.description}</p>
                  <ul className="space-y-2">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-[#FE02A1] flex-shrink-0 mt-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedTool(tool.title)}
                    className="mt-6 w-full px-6 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white hover:bg-[#FE02A1] hover:border-transparent transition-all duration-300"
                  >
                    Request Demo
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
            Why Choose VLTRN Analytics
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
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

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            How Businesses Leverage VLTRN Analytics
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-white/80 mb-4">{useCase.description}</p>
                  <div className="space-y-2">
                    {useCase.metrics.map((metric) => (
                      <div
                        key={metric}
                        className="flex items-center gap-2 text-[#FE02A1] font-semibold"
                      >
                        <TrendingUp className="w-4 h-4" />
                        {metric}
                      </div>
                    ))}
                  </div>
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
      <section id="demo" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-12 text-center">
            <h2 className="text-4xl font-['Exo_2'] font-bold text-white mb-4 [text-shadow:0_0_15px_#FE02A1]">
              Ready to Transform Your Analytics?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Get started with VLTRN's advanced analytics tools today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Schedule Demo
                <Send className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Download Brochure
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PerformanceAnalytics;