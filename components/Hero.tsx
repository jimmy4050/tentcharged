import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const handleShopNowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('products');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://picsum.photos/seed/hero-bg/1920/1080')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center p-4">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-wider drop-shadow-lg"
        >
          TentCharged
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-xl md:text-2xl font-light drop-shadow-md"
        >
          Powering Your Outdoor Adventures
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <a href="#products" onClick={handleShopNowClick} className="bg-forest-green text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl">
            Shop Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;