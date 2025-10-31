
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mountain, Users } from 'lucide-react';

const About: React.FC = () => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
          className="text-center"
        >
          <motion.h2 variants={cardVariants} className="text-4xl font-bold text-dark-gray mb-4">Our Story</motion.h2>
          <motion.p variants={cardVariants} className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
            Founded in the heart of China's manufacturing hub, TentCharged was born from a passion for exploration and a commitment to quality. We believe that the best adventures start with reliable gear. That's why we dedicate ourselves to designing and producing high-quality tents and outdoor shelters that you can trust, no matter where your journey takes you.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          <motion.div variants={cardVariants} className="p-6">
            <ShieldCheck className="mx-auto h-12 w-12 text-forest-green mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-gray-600">Every product undergoes rigorous testing to ensure it meets our high standards for durability, weather resistance, and ease of use.</p>
          </motion.div>
          <motion.div variants={cardVariants} className="p-6">
            <Mountain className="mx-auto h-12 w-12 text-forest-green mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-600">We are driven by innovation, a love for the outdoors, and a desire to make nature accessible and comfortable for everyone.</p>
          </motion.div>
          <motion.div variants={cardVariants} className="p-6">
            <Users className="mx-auto h-12 w-12 text-forest-green mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer-Centric</h3>
            <p className="text-gray-600">Your adventure is our priority. We provide exceptional support and listen to our community to continuously improve our products.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
