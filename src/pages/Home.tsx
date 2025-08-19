import React from 'react';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import CallToAction from '../components/CallToAction';

const Home = () => {
  console.log('🚀 Home page - Production Version Loading...');

  return (
    <div className="pt-16">
      <Hero />
      <ProductShowcase />
      <CallToAction />
    </div>
  );
};

export default Home;