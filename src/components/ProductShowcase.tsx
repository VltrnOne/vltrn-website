import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, Lightbulb, TrendingUp, Users2, Wallet } from 'lucide-react';

const products = [
  {
    icon: Building2,
    title: 'Business Funding',
    description: 'Access tailored financial solutions to fuel your growth',
    link: '/business-funding'
  },
  {
    icon: Globe,
    title: 'Global Expansion',
    description: 'Expand your reach into new markets with confidence',
    link: '/global-expansion'
  },
  {
    icon: Lightbulb,
    title: 'Product Development',
    description: 'Transform ideas into market-ready solutions',
    link: '/product-development'
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Data-driven insights for informed decision making',
    link: '/performance-analytics'
  },
  {
    icon: Users2,
    title: 'Partner Network',
    description: 'Connect with industry leaders and innovators',
    link: '/partners'
  },
  {
    icon: Wallet,
    title: 'Financial Management',
    description: 'Streamline operations and optimize cash flow',
    link: '/financial-management'
  },
];

const ProductShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-['Exo_2'] font-bold text-white text-center mb-4 [text-shadow:0_0_15px_#FE02A1]">
          Our Solutions
        </h2>
        <p className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto">
          Comprehensive tools and services to accelerate your business growth
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                onClick={() => navigate(product.link)}
                className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Icon className="w-12 h-12 text-[#FE02A1] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                <p className="text-white/80">{product.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;