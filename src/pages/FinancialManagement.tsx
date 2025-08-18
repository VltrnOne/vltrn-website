import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { 
  Shield, 
  Lock, 
  Users, 
  Scale,
  FileText,
  Landmark,
  ArrowRight,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Sphere from '../components/Sphere';

const trustTypes = [
  {
    icon: Lock,
    title: 'Revocable Living Trust',
    description: 'Flexible trust that can be modified during your lifetime',
    features: [
      'Maintain control of assets',
      'Avoid probate process',
      'Easy to modify or revoke',
      'Privacy protection'
    ]
  },
  {
    icon: Shield,
    title: 'Irrevocable Trust',
    description: 'Permanent trust offering maximum asset protection',
    features: [
      'Asset protection',
      'Tax advantages',
      'Medicaid planning',
      'Legacy preservation'
    ]
  },
  {
    icon: Users,
    title: 'Charitable Trust',
    description: 'Support charitable causes while receiving tax benefits',
    features: [
      'Tax deductions',
      'Income stream options',
      'Philanthropic legacy',
      'Estate tax reduction'
    ]
  },
  {
    icon: Scale,
    title: 'Special Needs Trust',
    description: 'Provide for loved ones with disabilities',
    features: [
      'Preserve benefits eligibility',
      'Professional management',
      'Lifetime support',
      'Asset protection'
    ]
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'Asset Protection',
    description: 'Shield your assets from creditors and legal claims'
  },
  {
    icon: FileText,
    title: 'Tax Efficiency',
    description: 'Minimize estate taxes and maximize wealth transfer'
  },
  {
    icon: Users,
    title: 'Family Security',
    description: 'Ensure your loved ones are provided for according to your wishes'
  },
  {
    icon: Landmark,
    title: 'Legacy Planning',
    description: 'Create a lasting legacy that reflects your values'
  }
];

const steps = [
  {
    title: 'Initial Consultation',
    description: 'Discuss your goals and assess your needs'
  },
  {
    title: 'Trust Design',
    description: 'Create a customized trust structure'
  },
  {
    title: 'Asset Evaluation',
    description: 'Review and organize assets for transfer'
  },
  {
    title: 'Documentation',
    description: 'Prepare and execute legal documents'
  },
  {
    title: 'Implementation',
    description: 'Transfer assets and establish administration'
  }
];

const faqs = [
  {
    question: 'When should I consider creating a trust?',
    answer: 'Consider creating a trust if you want to avoid probate, protect assets, provide for family members with special needs, or establish a charitable legacy. Trusts are particularly valuable for estates over $100,000 or those with complex distribution requirements.'
  },
  {
    question: 'How do I choose the right trustee?',
    answer: 'When selecting a trustee, consider their financial expertise, reliability, impartiality, and availability. You may choose a family member, professional trustee, or corporate trustee depending on your trust's complexity and requirements.'
  },
  {
    question: 'What assets can be placed in a trust?',
    answer: 'Most types of assets can be placed in a trust, including real estate, investments, business interests, life insurance policies, and personal property. The suitability depends on your specific goals and the type of trust.'
  },
  {
    question: 'How long does it take to set up a trust?',
    answer: 'The process typically takes 2-4 weeks, depending on the complexity of your estate and the type of trust. This includes consultation, document preparation, and asset transfer procedures.'
  }
];

const FinancialManagement = () => {
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
              Trust & Estate Planning
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Secure your legacy and protect your assets with comprehensive trust solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://zcal.co/t/vltrnjay/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Schedule Consultation
              </a>
              <button
                onClick={() => document.getElementById('trust-types')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Learn More
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

      {/* Trust Types Section */}
      <section id="trust-types" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Types of Trusts
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {trustTypes.map((trust) => {
              const Icon = trust.icon;
              return (
                <div
                  key={trust.title}
                  className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{trust.title}</h3>
                  <p className="text-white/80 mb-4">{trust.description}</p>
                  <ul className="space-y-2">
                    {trust.features.map((feature) => (
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

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Benefits of Trust Planning
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

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Process
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
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-12 text-center">
            <h2 className="text-4xl font-['Exo_2'] font-bold text-white mb-4 [text-shadow:0_0_15px_#FE02A1]">
              Ready to Secure Your Legacy?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a consultation with our trust and estate planning experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://zcal.co/t/vltrnjay/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Schedule Consultation
                <Calendar className="w-5 h-5" />
              </a>
              <a
                href="/resources/trust-planning-guide.pdf"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Download Trust Planning Guide
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialManagement;