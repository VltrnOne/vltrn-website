import React, { useEffect, useRef } from 'react';
import { ArrowRight, Award, Building, Globe2, Users } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sphere from '../components/Sphere';
import { Link } from 'react-router-dom';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface Leader {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
}

interface Metric {
  label: string;
  value: string;
  icon: React.ElementType;
}

const timeline: TimelineItem[] = [
  {
    year: '2020',
    title: 'Foundation',
    description: 'VLTRN was established with a vision to revolutionize business collaboration',
  },
  {
    year: '2021',
    title: 'Platform Launch',
    description: 'Released our core platform with innovative collaboration tools',
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Expanded operations to serve clients worldwide',
  },
  {
    year: '2023',
    title: 'AI Integration',
    description: 'Introduced advanced AI capabilities for enhanced business insights',
  },
  {
    year: '2024',
    title: 'Next Generation',
    description: 'Launching next-gen features for seamless business transformation',
  },
];

const leaders: Leader[] = [
  {
    name: 'Alexandra Chen',
    role: 'Chief Executive Officer',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    linkedin: '#',
  },
  {
    name: 'Michael Torres',
    role: 'Chief Technology Officer',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    linkedin: '#',
  },
  {
    name: 'Sarah Johnson',
    role: 'Chief Product Officer',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    linkedin: '#',
  },
];

const metrics: Metric[] = [
  { label: 'Global Partners', value: '500+', icon: Globe2 },
  { label: 'Projects Completed', value: '10K+', icon: Building },
  { label: 'Team Members', value: '150+', icon: Users },
  { label: 'Industry Awards', value: '25+', icon: Award },
];

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,2,161,0.1)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(254,2,161,0.05)_0%,transparent_100%)]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(254, 2, 161, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(254, 2, 161, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'top',
          }}
        />

        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Exo_2'] font-bold text-white mb-6 [text-shadow:0_0_15px_#FE02A1]">
              About VLTRN
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Pioneering innovation and collaboration to empower businesses worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => timelineRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Our Story
              </button>
              <Link
                to="/community"
                className="px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Join Us
              </Link>
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

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-8 hover:border-[#FE02A1] transition-all duration-300 animate-on-scroll">
              <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/80">
                To revolutionize how businesses collaborate and grow through innovative tools and strategies
              </p>
            </div>
            <div className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-8 hover:border-[#FE02A1] transition-all duration-300 animate-on-scroll">
              <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/80">
                To become the global leader in empowering businesses through seamless partnerships and transformative solutions
              </p>
            </div>
            <div className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-8 hover:border-[#FE02A1] transition-all duration-300 animate-on-scroll">
              <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-4">Our Values</h2>
              <ul className="text-white/80 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FE02A1]" />
                  Innovation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FE02A1]" />
                  Integrity
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FE02A1]" />
                  Collaboration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FE02A1]" />
                  Excellence
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="relative flex items-start gap-8 pb-12 animate-on-scroll"
              >
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[rgba(254,2,161,0.1)] border border-[#FE02A1] flex items-center justify-center text-white font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </div>
                {index < timeline.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-full bg-[rgba(254,2,161,0.3)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Leadership
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300 animate-on-scroll"
              >
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-white text-center mb-1">{leader.name}</h3>
                <p className="text-white/60 text-center mb-4">{leader.role}</p>
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 border border-[#FE02A1] rounded-lg text-white hover:bg-[#FE02A1] transition-all duration-300"
                >
                  Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact and Achievements */}
      <section className="py-20 px-4 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-12 [text-shadow:0_0_15px_#FE02A1]">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="text-center animate-on-scroll"
                >
                  <Icon className="w-12 h-12 text-[#FE02A1] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-white/60">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-12 text-center">
            <h2 className="text-4xl font-['Exo_2'] font-bold text-white mb-4 [text-shadow:0_0_15px_#FE02A1]">
              Join Our Journey
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Be part of the future of business collaboration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/community"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Join Our Community
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/partners"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#FE02A1] text-white rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;