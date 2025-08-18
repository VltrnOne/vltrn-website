import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ArrowRight, CheckCircle2, AlertCircle, TrendingUp, Clock, Shield, FileText } from 'lucide-react';
import Sphere from '../components/Sphere';

const packages = [
  {
    name: 'Starter Package',
    price: 'Up to $50,000',
    features: [
      'Basic financial planning tools',
      'Mentorship from industry experts',
      'Monthly performance reviews',
      'Basic analytics dashboard',
      'Email support'
    ],
    cta: 'Choose Package',
    popular: false
  },
  {
    name: 'Growth Package',
    price: 'Up to $500,000',
    features: [
      'Comprehensive financial planning',
      'Access to partnership opportunities',
      'Weekly strategy sessions',
      'Advanced analytics suite',
      'Priority support'
    ],
    cta: 'Choose Package',
    popular: true
  },
  {
    name: 'Enterprise Package',
    price: '$1,000,000+',
    features: [
      'Custom-tailored solutions',
      'Dedicated account manager',
      'Daily consultation access',
      'Custom reporting tools',
      'White-glove service'
    ],
    cta: 'Contact Us for Pricing',
    popular: false
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Rapid Growth',
    description: 'Access capital to scale your business quickly and efficiently'
  },
  {
    icon: Clock,
    title: 'Quick Approval',
    description: 'Streamlined process with decisions in as little as 48 hours'
  },
  {
    icon: Shield,
    title: 'Secure Process',
    description: 'Bank-grade security protecting your sensitive information'
  },
  {
    icon: FileText,
    title: 'Flexible Terms',
    description: 'Customizable repayment terms that match your cash flow'
  }
];

const steps = [
  {
    title: 'Apply Online',
    description: 'Complete our simple online application in minutes'
  },
  {
    title: 'Quick Review',
    description: 'Our team reviews your application within 48 hours'
  },
  {
    title: 'Get Funded',
    description: 'Receive funds directly to your business account'
  },
  {
    title: 'Grow Together',
    description: 'Access ongoing support and resources for success'
  }
];

const faqs = [
  {
    question: 'What types of businesses qualify?',
    answer: 'We fund businesses across various industries that have been operating for at least 6 months and have monthly revenue of $10,000 or more.'
  },
  {
    question: 'How long does the approval process take?',
    answer: 'Most applications are reviewed within 48 hours, with funding available within 5-7 business days after approval.'
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees. We believe in complete transparency. All fees and terms are clearly outlined before you commit.'
  },
  {
    question: 'What documents are required?',
    answer: 'Typically, we need recent bank statements, tax returns, and basic business information. Specific requirements vary by funding amount.'
  }
];

const BusinessFunding = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              Business Funding Solutions
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Access tailored financial solutions to fuel your growth and transform your business vision into reality
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Explore Packages
              </button>
              <button
                onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
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

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Why Choose VLTRN for Business Funding?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/80">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Funding Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border ${
                  pkg.popular ? 'border-[#FE02A1]' : 'border-[rgba(254,2,161,0.3)]'
                } rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300 relative`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FE02A1] rounded-full text-white text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl text-[#FE02A1] font-bold mb-6">{pkg.price}</div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-[#FE02A1] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPackage(pkg.name)}
                  className="w-full px-6 py-3 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            How It Works
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
      <section id="apply" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-12 text-center">
            <h2 className="text-4xl font-['Exo_2'] font-bold text-white mb-4 [text-shadow:0_0_15px_#FE02A1]">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Take the first step towards securing the funding your business needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
                Apply Now
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

export default BusinessFunding;