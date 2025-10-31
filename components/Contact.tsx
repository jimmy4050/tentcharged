
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mock API call
  const mockSendEmail = async (data: typeof formData) => {
    console.log('Sending email to sales@tentcharged.com with data:', data);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (data.email.includes('@')) {
          resolve();
        } else {
          reject(new Error('Invalid email address'));
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await mockSendEmail(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-dark-gray mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-green focus:border-forest-green" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-green focus:border-forest-green" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-green focus:border-forest-green"></textarea>
              </div>
              <div>
                <button type="submit" disabled={status === 'sending'} className="w-full bg-forest-green text-white font-bold py-3 px-6 rounded-md hover:bg-green-800 transition-colors duration-300 disabled:bg-gray-400">
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {status === 'success' && <p className="text-green-600">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-600">Failed to send message. Please try again.</p>}
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-semibold mb-4">Contact Us Directly</h3>
            <div className="flex flex-col items-center md:items-start">
              <p className="text-gray-600 mb-4">For immediate inquiries or orders, please contact us via WeChat.</p>
              <img src="https://picsum.photos/seed/qrcode/250/250" alt="WeChat QR Code" className="w-48 h-48 border-4 border-gray-200 rounded-lg shadow-sm" />
              <p className="mt-2 text-gray-600">WeChat ID: TentChargedSales</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;