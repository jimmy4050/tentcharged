import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  // A simple component for the WeChat icon as Lucide doesn't have it
  const WeChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17.5c-3.87 0-7-1.4-7-3.14 0-1.76 3.13-3.17 7-3.17.55 0 1.09.04 1.6.11m4.38 2.53c.27-.14.53-.29.77-.45.7-.47 1.25-.93 1.25-1.44 0-.54-.6-1-1.34-1.44-.73-.44-1.63-.6-2.66-.6-3.87 0-7 1.4-7 3.14 0 1.2.9 2.21 2.22 2.76.5.2 1.03.35 1.58.45.55.1 1.12.14 1.7.14 1.48 0 2.85-.3 4.02-.82" />
      <path d="M14.5 10.16c.35.28.5.72.5 1.18 0 .47-.15.91-.5 1.18" />
      <path d="M18.5 10.16c.35.28.5.72.5 1.18 0 .47-.15.91-.5 1.18" />
      <path d="M21 12.82V18c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-4.4" />
      <path d="m19 6-1.5 9" />
      <path d="m10 6-1.5 9" />
    </svg>
  );

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-gray text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} TentCharged.com. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#contact" onClick={handleContactClick} aria-label="WeChat" className="hover:text-forest-green transition-colors"><WeChatIcon /></a>
            <a href="https://wa.me/8618612345678" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-forest-green transition-colors"><MessageCircle /></a>
            <a href="mailto:sales@tentcharged.com" aria-label="Email" className="hover:text-forest-green transition-colors"><Mail /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
